import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import crypto from "node:crypto";
import { prisma } from "@/app/_kernel/db/prisma/client";
import { afdQueue } from "@/app/_core/infrastructure/queue/afd.queue";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function safeName(name: string) {
  const base = path.basename(name);
  return base.replace(/[^\w.\-()\s]/g, "_");
}

function sha256(buf: Buffer) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

/**
 * AJUSTE ESTE PATH para o caminho real do seu page.tsx.
 * Aqui está conforme: app/(private)/dashboard/admin/tenant/import/_upload
 */
function getUploadDir() {
  return path.join(
    process.cwd(),
    "app",
    "(private)",
    "dashboard",
    "admin",
    "afd",
    "import",
    "_upload",
  );
}

// >>> Ajuste para sua realidade (Auth.js / session / header etc.)
async function resolveTenantId() {
  // Ex.: buscar do token / session. Aqui fica fixo para compilar.
  return "AFD_DEMO";
}

export async function POST(req: Request) {
  try {
    const tenantId = await resolveTenantId();
    const uploadDir = getUploadDir();
    await fs.mkdir(uploadDir, { recursive: true });

    const form = await req.formData();
    const files = form.getAll("files");

    if (!files.length) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado." },
        { status: 400 },
      );
    }

    // 1 import por request
    const afdImport = await prisma.afdImport.create({
      data: { tenantId, source: "upload-manual" },
    });

    const created: Array<{
      afdFileId: string;
      original: string;
      storedAs: string;
      bytes: number;
    }> = [];

    for (const entry of files) {
      if (!(entry instanceof File)) continue;

      const original = entry.name || "arquivo";
      const filename = safeName(original);

      const ext = path.extname(filename);
      const base = path.basename(filename, ext);
      const unique = `${base}__${Date.now()}__${crypto.randomUUID()}${ext}`;

      const dest = path.join(uploadDir, unique);

      const buf = Buffer.from(await entry.arrayBuffer());
      await fs.writeFile(dest, buf);

      const afdFile = await prisma.afdFile.create({
        data: {
          importId: afdImport.id,
          originalName: original,
          storedName: unique,
          filePath: dest,
          sha256: sha256(buf),
          sizeBytes: buf.length,
          mimeType: entry.type || null,
          status: "PENDING",
        },
      });

      await afdQueue.add(
        "parse-afd",
        {
          tenantId,
          importId: afdImport.id,
          afdFileId: afdFile.id,
          filePath: dest,
          layoutName: "BASE_TYPE3_NSR_DATE_TIME_CPF",
          storeRawText: false, // true se quiser salvar conteúdo em rawText (cuidado com tamanho)
        },
        {
          attempts: 3,
          backoff: { type: "exponential", delay: 2000 },
          removeOnComplete: 500,
          removeOnFail: 500,
        },
      );

      created.push({
        afdFileId: afdFile.id,
        original,
        storedAs: unique,
        bytes: buf.length,
      });
    }

    return NextResponse.json(
      { ok: true, importId: afdImport.id, files: created },
      { status: 201 },
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Erro ao salvar/enfileirar arquivos." },
      { status: 500 },
    );
  }
}
