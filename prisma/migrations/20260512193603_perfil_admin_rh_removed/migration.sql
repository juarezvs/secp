/*
  Warnings:

  - The values [ADMIN,RH] on the enum `PapelSistema` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PapelSistema_new" AS ENUM ('SERVIDOR', 'GESTOR', 'ADMINISTRADOR', 'MASTER');
ALTER TABLE "public"."usuarios" ALTER COLUMN "papel" DROP DEFAULT;
ALTER TABLE "usuarios" ALTER COLUMN "papel" TYPE "PapelSistema_new" USING ("papel"::text::"PapelSistema_new");
ALTER TYPE "PapelSistema" RENAME TO "PapelSistema_old";
ALTER TYPE "PapelSistema_new" RENAME TO "PapelSistema";
DROP TYPE "public"."PapelSistema_old";
ALTER TABLE "usuarios" ALTER COLUMN "papel" SET DEFAULT 'SERVIDOR';
COMMIT;
