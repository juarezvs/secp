-- CreateEnum
CREATE TYPE "AfdFileStatus" AS ENUM ('PENDING', 'PROCESSING', 'DONE', 'ERROR');

-- CreateTable
CREATE TABLE "AfdImport" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT,

    CONSTRAINT "AfdImport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AfdFile" (
    "id" TEXT NOT NULL,
    "importId" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "storedName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "sha256" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "mimeType" TEXT,
    "rawText" TEXT,
    "parsedJson" JSONB,
    "status" "AfdFileStatus" NOT NULL DEFAULT 'PENDING',
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),

    CONSTRAINT "AfdFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AfdFile" ADD CONSTRAINT "AfdFile_importId_fkey" FOREIGN KEY ("importId") REFERENCES "AfdImport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
