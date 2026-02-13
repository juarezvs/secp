/*
  Warnings:

  - You are about to drop the column `externalIdSarh` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `externalIdSarh` on the `Unit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[externalSarhId]` on the table `Tenant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[externalSarhId]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalSarhId` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalSarhId` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tenant_externalIdSarh_key";

-- DropIndex
DROP INDEX "Unit_externalIdSarh_key";

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "externalIdSarh",
ADD COLUMN     "externalSarhId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "externalIdSarh",
ADD COLUMN     "externalSarhId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_externalSarhId_key" ON "Tenant"("externalSarhId");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_externalSarhId_key" ON "Unit"("externalSarhId");
