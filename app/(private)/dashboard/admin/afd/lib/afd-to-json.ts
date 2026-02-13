import fs from "node:fs";
import readline from "node:readline";

export type AfdJson = {
  meta: { sourceFile?: string; parsedAt: string; layoutName: string };
  header?: Record<string, any>;
  employers: Record<string, any>[];
  markings: Array<{
    nsr: number;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
    cpf: string;
    raw: string;
  }>;
  adjustments: Record<string, any>[];
  trailer?: Record<string, any>;
  stats: {
    totalLines: number;
    byType: Record<string, number>;
    invalidLines: number;
  };
};

type Slice = { start: number; len: number }; // 1-based start

function cut(line: string, s: Slice) {
  const i = Math.max(0, s.start - 1);
  return line.slice(i, i + s.len);
}

function toInt(s: string) {
  const v = Number(s.trim());
  return Number.isFinite(v) ? v : NaN;
}

function yyyymmddToIso(s: string) {
  const t = s.trim();
  console.log("data to ISO:", t);
  if (t.length !== 10) return "";
  return `${t.slice(0, 4)}-${t.slice(5, 7)}-${t.slice(8, 10)}`;
}

function hhmmToIsoTime(s: string) {
  const t = s.trim();
  if (t.length !== 7) return "";
  return `${t.slice(0, 2)}:${t.slice(3, 5)}`;
}

/**
 * Layout configurável.
 * Ajuste as posições conforme AFD do seu REP, se necessário.
 */
export type AfdLayout = {
  name: string;
  type3: {
    nsr: Slice; // ex.: 2..10 (9)
    date: Slice; // ex.: 11..18 (8)
    time: Slice; // ex.: 19..22 (4)
    cpf: Slice; // ex.: 23..33 (11)
  };
};

export const LAYOUT_BASE: AfdLayout = {
  name: "BASE_TYPE3_NSR_DATE_TIME_CPF",
  type3: {
    nsr: { start: 1, len: 9 },
    date: { start: 11, len: 10 },
    time: { start: 22, len: 7 },
    cpf: { start: 35, len: 12 },
  },
};

export async function afdFileToJson(
  filePath: string,
  layout: AfdLayout = LAYOUT_BASE,
): Promise<AfdJson> {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath, { encoding: "latin1" }),
    crlfDelay: Infinity,
  });

  const out: AfdJson = {
    meta: {
      sourceFile: filePath,
      parsedAt: new Date().toISOString(),
      layoutName: layout.name,
    },
    employers: [],
    markings: [],
    adjustments: [],
    stats: { totalLines: 0, byType: {}, invalidLines: 0 },
  };

  for await (const rawLine of rl) {
    const line = rawLine.replace(/\r?\n$/, "");

    // console.log("LINHA: ", line);

    out.stats.totalLines += 1;

    const type = line[9] ?? "";

    // console.log("TYPE: ", type);

    out.stats.byType[type] = (out.stats.byType[type] ?? 0) + 1;

    switch (type) {
      case "1":
        out.header = { raw: line };
        break;

      case "2":
        out.employers.push({ raw: line });
        break;

      case "3": {
        const nsrStr = cut(line, layout.type3.nsr);
        const dateStr = cut(line, layout.type3.date);
        const timeStr = cut(line, layout.type3.time);
        const cpfStr = cut(line, layout.type3.cpf).trim();

        const nsr = toInt(nsrStr);
        const date = yyyymmddToIso(dateStr);
        const time = hhmmToIsoTime(timeStr);

        if (!Number.isFinite(nsr) || !date || !time || !cpfStr) {
          out.stats.invalidLines += 1;
          out.markings.push({
            nsr: Number.isFinite(nsr) ? nsr : -1,
            date: date || "",
            time: time || "",
            cpf: cpfStr || "",
            raw: line,
          });
          break;
        }

        out.markings.push({ nsr, date, time, cpf: cpfStr, raw: line });
        console.log("TIPO 3: ", { nsr, date, time, cpfStr, line });
        break;
      }

      case "4":
        out.adjustments.push({ raw: line });
        break;

      case "5":
        out.trailer = { raw: line };
        break;

      default:
        out.stats.invalidLines += 1;
        break;
    }
  }

  return out;
}
