-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SERVER', 'MANAGER', 'NUTEC', 'SECAP', 'DIREF', 'AUDITOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "RegimeTrabalho" AS ENUM ('PRESENCIAL', 'TELETRABALHO', 'HIBRIDO');

-- CreateEnum
CREATE TYPE "JornadaTipo" AS ENUM ('SETE_HORAS', 'OITO_HORAS', 'ESPECIAL', 'DIFERENCIADO');

-- CreateEnum
CREATE TYPE "PunchKind" AS ENUM ('IN', 'OUT', 'BREAK_OUT', 'BREAK_IN');

-- CreateEnum
CREATE TYPE "PunchSource" AS ENUM ('BIOMETRIC_DEVICE', 'ALTERNATIVE_METHOD', 'MANUAL_EXCEPTION');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('OK', 'INCONSISTENTE', 'PENDENTE_REGULARIZACAO', 'HOMOLOGADO', 'FECHADO');

-- CreateEnum
CREATE TYPE "LedgerEntryType" AS ENUM ('CREDIT', 'DEBIT', 'COMPENSATION', 'EXCESS_SAT', 'EXCESS_SUN_HOL', 'NIGHT_EXCESS', 'UNAUTHORIZED', 'ABOVE_LIMIT', 'ADJUSTMENT');

-- CreateEnum
CREATE TYPE "AuthorizationType" AS ENUM ('WORK_EXTRA_CREDIT', 'COMPENSATE_DEBIT', 'FRUIR_CREDIT', 'EXTERNAL_ACTIVITY', 'TRAVEL', 'TRAINING', 'DISPENSA_PONTO', 'RATIFY_ABOVE_LIMIT');

-- CreateEnum
CREATE TYPE "AuthorizationStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED', 'CANCELLED');

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isOnboarded" BOOLEAN NOT NULL DEFAULT false,
    "sarhUf" TEXT,
    "matricula" TEXT,
    "companyId" TEXT,
    "branchId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "parentId" TEXT,
    "managerId" TEXT,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "roles" "Role"[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "userId" TEXT,
    "unitId" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "regime" "RegimeTrabalho" NOT NULL DEFAULT 'PRESENCIAL',
    "jornadaTipo" "JornadaTipo" NOT NULL,
    "isComissionado" BOOLEAN NOT NULL DEFAULT false,
    "isOficialJustica" BOOLEAN NOT NULL DEFAULT false,
    "isDispensaPonto" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkSchedule" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "jornadaTipo" "JornadaTipo" NOT NULL,
    "minutesPerDay" INTEGER NOT NULL,
    "breakMinMinutes" INTEGER,
    "breakMaxMinutes" INTEGER,
    "flexInMinutes" INTEGER NOT NULL,
    "flexOutMinutes" INTEGER NOT NULL,
    "allowBefore6" BOOLEAN NOT NULL DEFAULT false,
    "allowAfter19" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "WorkSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleAssignment" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validTo" TIMESTAMP(3),

    CONSTRAINT "ScheduleAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BiometricDevice" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "serial" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "BiometricDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PunchEvent" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "kind" "PunchKind" NOT NULL,
    "source" "PunchSource" NOT NULL,
    "deviceId" TEXT,
    "rawPayload" JSONB,
    "integrityHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PunchEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalActivity" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "proofDocUrl" TEXT,
    "authorizationId" TEXT,

    CONSTRAINT "ExternalActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Travel" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "destination" TEXT NOT NULL,
    "authorizationId" TEXT,

    CONSTRAINT "Travel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Training" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hours" INTEGER NOT NULL,
    "isInternal" BOOLEAN NOT NULL,
    "proofDocUrl" TEXT,
    "authorizationId" TEXT,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendanceDay" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "scheduledMin" INTEGER NOT NULL,
    "workedMin" INTEGER NOT NULL,
    "breakMin" INTEGER NOT NULL,
    "debitMin" INTEGER NOT NULL,
    "creditMin" INTEGER NOT NULL,
    "unauthorizedMin" INTEGER NOT NULL,
    "aboveLimitMin" INTEGER NOT NULL,
    "excessSatMin" INTEGER NOT NULL,
    "excessSunHolMin" INTEGER NOT NULL,
    "nightExcessMin" INTEGER NOT NULL,
    "status" "AttendanceStatus" NOT NULL DEFAULT 'OK',
    "flags" TEXT[],

    CONSTRAINT "AttendanceDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendanceMonth" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "monthRef" TEXT NOT NULL,
    "scheduledMin" INTEGER NOT NULL,
    "workedMin" INTEGER NOT NULL,
    "debitMin" INTEGER NOT NULL,
    "creditMin" INTEGER NOT NULL,
    "saldoMin" INTEGER NOT NULL,
    "status" "AttendanceStatus" NOT NULL DEFAULT 'OK',
    "homologatedAt" TIMESTAMP(3),
    "homologatedBy" TEXT,

    CONSTRAINT "AttendanceMonth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankHourLedgerEntry" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "monthRef" TEXT NOT NULL,
    "type" "LedgerEntryType" NOT NULL,
    "minutes" INTEGER NOT NULL,
    "factor" DOUBLE PRECISION,
    "sourceRef" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BankHourLedgerEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorizationRequest" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "type" "AuthorizationType" NOT NULL,
    "status" "AuthorizationStatus" NOT NULL DEFAULT 'DRAFT',
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "minutes" INTEGER,
    "reason" TEXT NOT NULL,
    "decidedAt" TIMESTAMP(3),
    "decidedBy" TEXT,
    "decisionNote" TEXT,

    CONSTRAINT "AuthorizationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delegation" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validTo" TIMESTAMP(3),
    "note" TEXT,
    "userId" TEXT,

    CONSTRAINT "Delegation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Holiday" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "isNational" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Holiday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "actorUserId" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_userId_key" ON "Employee"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_tenantId_matricula_key" ON "Employee"("tenantId", "matricula");

-- CreateIndex
CREATE INDEX "ScheduleAssignment_tenantId_employeeId_validFrom_idx" ON "ScheduleAssignment"("tenantId", "employeeId", "validFrom");

-- CreateIndex
CREATE UNIQUE INDEX "BiometricDevice_serial_key" ON "BiometricDevice"("serial");

-- CreateIndex
CREATE INDEX "PunchEvent_tenantId_employeeId_occurredAt_idx" ON "PunchEvent"("tenantId", "employeeId", "occurredAt");

-- CreateIndex
CREATE UNIQUE INDEX "ExternalActivity_authorizationId_key" ON "ExternalActivity"("authorizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Travel_authorizationId_key" ON "Travel"("authorizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Training_authorizationId_key" ON "Training"("authorizationId");

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceDay_tenantId_employeeId_date_key" ON "AttendanceDay"("tenantId", "employeeId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceMonth_tenantId_employeeId_monthRef_key" ON "AttendanceMonth"("tenantId", "employeeId", "monthRef");

-- CreateIndex
CREATE INDEX "BankHourLedgerEntry_tenantId_employeeId_monthRef_idx" ON "BankHourLedgerEntry"("tenantId", "employeeId", "monthRef");

-- CreateIndex
CREATE INDEX "AuthorizationRequest_tenantId_employeeId_type_status_idx" ON "AuthorizationRequest"("tenantId", "employeeId", "type", "status");

-- CreateIndex
CREATE INDEX "Delegation_tenantId_unitId_validFrom_idx" ON "Delegation"("tenantId", "unitId", "validFrom");

-- CreateIndex
CREATE UNIQUE INDEX "Holiday_tenantId_date_key" ON "Holiday"("tenantId", "date");

-- CreateIndex
CREATE INDEX "AuditLog_tenantId_createdAt_idx" ON "AuditLog"("tenantId", "createdAt");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkSchedule" ADD CONSTRAINT "WorkSchedule_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleAssignment" ADD CONSTRAINT "ScheduleAssignment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleAssignment" ADD CONSTRAINT "ScheduleAssignment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleAssignment" ADD CONSTRAINT "ScheduleAssignment_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "WorkSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BiometricDevice" ADD CONSTRAINT "BiometricDevice_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BiometricDevice" ADD CONSTRAINT "BiometricDevice_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PunchEvent" ADD CONSTRAINT "PunchEvent_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PunchEvent" ADD CONSTRAINT "PunchEvent_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PunchEvent" ADD CONSTRAINT "PunchEvent_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "BiometricDevice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalActivity" ADD CONSTRAINT "ExternalActivity_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalActivity" ADD CONSTRAINT "ExternalActivity_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalActivity" ADD CONSTRAINT "ExternalActivity_authorizationId_fkey" FOREIGN KEY ("authorizationId") REFERENCES "AuthorizationRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_authorizationId_fkey" FOREIGN KEY ("authorizationId") REFERENCES "AuthorizationRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_authorizationId_fkey" FOREIGN KEY ("authorizationId") REFERENCES "AuthorizationRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceDay" ADD CONSTRAINT "AttendanceDay_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceDay" ADD CONSTRAINT "AttendanceDay_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceMonth" ADD CONSTRAINT "AttendanceMonth_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceMonth" ADD CONSTRAINT "AttendanceMonth_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankHourLedgerEntry" ADD CONSTRAINT "BankHourLedgerEntry_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankHourLedgerEntry" ADD CONSTRAINT "BankHourLedgerEntry_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorizationRequest" ADD CONSTRAINT "AuthorizationRequest_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorizationRequest" ADD CONSTRAINT "AuthorizationRequest_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delegation" ADD CONSTRAINT "Delegation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delegation" ADD CONSTRAINT "Delegation_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delegation" ADD CONSTRAINT "Delegation_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delegation" ADD CONSTRAINT "Delegation_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delegation" ADD CONSTRAINT "Delegation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holiday" ADD CONSTRAINT "Holiday_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
