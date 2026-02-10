import { prisma } from "@/app/_kernel/db/prisma/client";
import { clockIdempotencyKey } from "@/app/_kernel/ids/idempotency";

type InputEvent = {
  nsr: string;
  employeeId: string;
  occurredAtUtc: string; // ISO
  occurredAtLocal: string; // ISO
  timezone: string;
  payload?: any;
};

export class SyncClockEventsUseCase {
  async execute(input: {
    companyId: string;
    branchId: string;
    clockId?: string;
    clockSerial: string;
    events: InputEvent[];
  }) {
    const created: number[] = [];
    const skipped: number[] = [];

    // Inserção por lote controlada
    for (let i = 0; i < input.events.length; i++) {
      const e = input.events[i];
      const key = clockIdempotencyKey({
        clockSerial: input.clockSerial,
        nsr: e.nsr,
      });

      try {
        await prisma.clockEventRaw.create({
          data: {
            companyId: input.companyId,
            branchId: input.branchId,
            employeeId: e.employeeId,
            clockId: input.clockId ?? null,
            source: "CLOCK",
            sourceRef: e.nsr,
            idempotencyKey: key,
            occurredAtUtc: new Date(e.occurredAtUtc),
            occurredAtLocal: new Date(e.occurredAtLocal),
            timezone: e.timezone,
            payload: e.payload ?? undefined,
          },
        });
        created.push(i);
      } catch (err: any) {
        // conflito de idempotência
        if (String(err?.code) === "P2002") skipped.push(i);
        else throw err;
      }
    }

    return { createdCount: created.length, skippedCount: skipped.length };
  }
}
