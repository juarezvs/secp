-- CreateEnum
CREATE TYPE "ClockEventSource" AS ENUM ('CLOCK', 'SECP');

-- CreateEnum
CREATE TYPE "ManualAdjustmentType" AS ENUM ('ADD', 'UPDATE', 'REMOVE');

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELED');

-- CreateEnum
CREATE TYPE "OvertimeEntryType" AS ENUM ('CREDIT', 'DEBIT', 'ADJUST');

-- CreateTable
CREATE TABLE "ClockEventRaw" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "clockId" TEXT,
    "source" "ClockEventSource" NOT NULL,
    "sourceRef" TEXT,
    "idempotencyKey" TEXT NOT NULL,
    "occurredAtUtc" TIMESTAMP(3) NOT NULL,
    "occurredAtLocal" TIMESTAMP(3) NOT NULL,
    "timezone" TEXT NOT NULL,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClockEventRaw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManualAdjustment" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "workDateLocal" TIMESTAMP(3) NOT NULL,
    "type" "ManualAdjustmentType" NOT NULL,
    "reason" TEXT NOT NULL,
    "targetEventId" TEXT,
    "newOccurredAtUtc" TIMESTAMP(3),
    "newOccurredAtLocal" TIMESTAMP(3),
    "newTimezone" TEXT,
    "status" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "requestedByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManualAdjustment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Approval" (
    "id" TEXT NOT NULL,
    "adjustmentId" TEXT NOT NULL,
    "status" "ApprovalStatus" NOT NULL,
    "decisionReason" TEXT,
    "decidedByUserId" TEXT NOT NULL,
    "decidedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Approval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OvertimeBankEntry" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "workDateLocal" TIMESTAMP(3) NOT NULL,
    "minutes" INTEGER NOT NULL,
    "type" "OvertimeEntryType" NOT NULL,
    "reason" TEXT NOT NULL,
    "referenceType" TEXT,
    "referenceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OvertimeBankEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClockEventRaw_idempotencyKey_key" ON "ClockEventRaw"("idempotencyKey");

-- CreateIndex
CREATE INDEX "ClockEventRaw_employeeId_occurredAtUtc_idx" ON "ClockEventRaw"("employeeId", "occurredAtUtc");

-- CreateIndex
CREATE INDEX "ClockEventRaw_companyId_branchId_occurredAtUtc_idx" ON "ClockEventRaw"("companyId", "branchId", "occurredAtUtc");

-- CreateIndex
CREATE INDEX "ManualAdjustment_employeeId_workDateLocal_idx" ON "ManualAdjustment"("employeeId", "workDateLocal");

-- CreateIndex
CREATE INDEX "ManualAdjustment_status_idx" ON "ManualAdjustment"("status");

-- CreateIndex
CREATE INDEX "Approval_adjustmentId_idx" ON "Approval"("adjustmentId");

-- CreateIndex
CREATE INDEX "OvertimeBankEntry_employeeId_workDateLocal_idx" ON "OvertimeBankEntry"("employeeId", "workDateLocal");

-- AddForeignKey
ALTER TABLE "Approval" ADD CONSTRAINT "Approval_adjustmentId_fkey" FOREIGN KEY ("adjustmentId") REFERENCES "ManualAdjustment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
