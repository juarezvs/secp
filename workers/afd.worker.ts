import "dotenv/config";
import { Worker } from "bullmq";
import IORedis from "ioredis";
import fs from "node:fs/promises";

import { prisma } from "../app/_kernel/db/prisma/client";

import {
  afdFileToJson,
  LAYOUT_BASE,
} from "../app/(private)/dashboard/admin/afd/lib/afd-to-json";

const connection = new IORedis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "afd-import",
  async (job) => {
    const { afdFileId, filePath, storeRawText } = job.data;

    await prisma.arquivoAfd.update({
      where: { id: afdFileId },
      data: { status: "PROCESSANDO", mensagemErro: null },
    });

    try {
      await fs.access(filePath);

      const parsed = await afdFileToJson(filePath, LAYOUT_BASE);

      let rawText: string | null = null;
      if (storeRawText) {
        rawText = await fs.readFile(filePath, "latin1");
      }

      await prisma.arquivoAfd.update({
        where: { id: afdFileId },
        data: {
          status: "CONCLUIDO",
          jsonParseado: parsed as any,
          textoBruto: rawText ?? undefined,
          processadoEm: new Date(),
        },
      });

      return { ok: true, markings: parsed.markings.length };
    } catch (e: any) {
      await prisma.arquivoAfd.update({
        where: { id: afdFileId },
        data: {
          status: "ERRO",
          mensagemErro: e?.message ?? "Falha no processamento do AFD",
          processadoEm: new Date(),
        },
      });
      throw e;
    }
  },
  { connection, concurrency: 2 },
);

worker.on("completed", (job, result) => {
  console.log(`[afd] completed job=${job.id}`, result);
});

worker.on("failed", (job, err) => {
  console.error(`[afd] failed job=${job?.id}`, err);
});

console.log("[afd] worker up");
