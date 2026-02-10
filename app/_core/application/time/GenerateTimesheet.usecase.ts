import { prisma } from "@/app/_kernel/db/prisma/client";

type EffectiveMark = {
  occurredAtUtc: Date;
  occurredAtLocal?: Date;
  timezone: string;
  source: "RAW" | "ADJUSTMENT";
  rawId?: string;
  adjustmentId?: string;
};

export class GenerateTimesheetUseCase {
  async execute(input: {
    employeeId: string;
    fromUtcISO: string;
    toUtcISO: string;
  }) {
    const [raw, adjs] = await Promise.all([
      prisma.clockEventRaw.findMany({
        where: {
          employeeId: input.employeeId,
          occurredAtUtc: {
            gte: new Date(input.fromUtcISO),
            lt: new Date(input.toUtcISO),
          },
        },
        orderBy: { occurredAtUtc: "asc" },
      }),
      prisma.manualAdjustment.findMany({
        where: {
          employeeId: input.employeeId,
          status: "APPROVED",
          // usa workDateLocal para recorte (simples)
          workDateLocal: {
            gte: new Date(input.fromUtcISO),
            lt: new Date(input.toUtcISO),
          },
        },
        orderBy: { createdAt: "asc" },
      }),
    ]);

    // 1) base
    const effective = new Map<string, EffectiveMark>(); // key = rawId ou synthetic
    for (const r of raw) {
      effective.set(r.id, {
        occurredAtUtc: r.occurredAtUtc,
        occurredAtLocal: r.occurredAtLocal,
        timezone: r.timezone,
        source: "RAW",
        rawId: r.id,
      });
    }

    // 2) overlay
    for (const a of adjs) {
      if (a.type === "REMOVE" && a.targetEventId) {
        effective.delete(a.targetEventId);
      }

      if (a.type === "UPDATE" && a.targetEventId && a.newOccurredAtUtc) {
        const current = effective.get(a.targetEventId);
        if (current) {
          current.occurredAtUtc = a.newOccurredAtUtc;
          current.occurredAtLocal =
            a.newOccurredAtLocal ?? current.occurredAtLocal;
          current.timezone = a.newTimezone ?? current.timezone;
          current.source = "ADJUSTMENT";
          current.adjustmentId = a.id;
        }
      }

      if (a.type === "ADD" && a.newOccurredAtUtc) {
        const syntheticId = `ADD:${a.id}`;
        effective.set(syntheticId, {
          occurredAtUtc: a.newOccurredAtUtc,
          occurredAtLocal: a.newOccurredAtLocal ?? undefined,
          timezone: a.newTimezone ?? "UTC",
          source: "ADJUSTMENT",
          adjustmentId: a.id,
        });
      }
    }

    const marks = Array.from(effective.values()).sort(
      (x, y) => x.occurredAtUtc.getTime() - y.occurredAtUtc.getTime(),
    );

    // 3) cálculo simplificado por pares (entrada/saída)
    // Observação: regra real deve considerar jornadas, intervalos, tolerâncias, etc.
    const intervals: Array<{ in: Date; out: Date; minutes: number }> = [];
    for (let i = 0; i + 1 < marks.length; i += 2) {
      const a = marks[i];
      const b = marks[i + 1];
      const minutes = Math.max(
        0,
        Math.round(
          (b.occurredAtUtc.getTime() - a.occurredAtUtc.getTime()) / 60000,
        ),
      );
      intervals.push({ in: a.occurredAtUtc, out: b.occurredAtUtc, minutes });
    }

    const totalMinutes = intervals.reduce((acc, it) => acc + it.minutes, 0);

    return {
      employeeId: input.employeeId,
      period: { fromUtc: input.fromUtcISO, toUtc: input.toUtcISO },
      marks,
      intervals,
      totalMinutes,
      // extras/saldo: plugável via ScheduleResolver + Policy
    };
  }
}
