/*
  Warnings:

  - A unique constraint covering the columns `[externalIdSarh]` on the table `Tenant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[externalIdSarh]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalIdSarh` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalIdSarh` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "externalIdSarh" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "externalIdSarh" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_externalIdSarh_key" ON "Tenant"("externalIdSarh");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_externalIdSarh_key" ON "Unit"("externalIdSarh");
