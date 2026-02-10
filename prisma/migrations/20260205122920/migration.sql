/*
  Warnings:

  - A unique constraint covering the columns `[nickname]` on the table `Tenant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nickname` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SessionEndReason" AS ENUM ('LOGOUT', 'CLIENT_CLOSE', 'TIMEOUT', 'EXPIRED', 'ADMIN_REVOKE');

-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "nickname" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AuditSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tenantId" TEXT,
    "loginAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "endReason" "SessionEndReason",
    "ip" TEXT,
    "userAgent" TEXT,
    "jwtId" TEXT,

    CONSTRAINT "AuditSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuditSession_jwtId_key" ON "AuditSession"("jwtId");

-- CreateIndex
CREATE INDEX "AuditSession_userId_lastSeenAt_idx" ON "AuditSession"("userId", "lastSeenAt");

-- CreateIndex
CREATE INDEX "AuditSession_endedAt_idx" ON "AuditSession"("endedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_nickname_key" ON "Tenant"("nickname");

-- AddForeignKey
ALTER TABLE "AuditSession" ADD CONSTRAINT "AuditSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
