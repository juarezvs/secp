-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TipoUnidadeOrganizacional" ADD VALUE 'DIRETORIA';
ALTER TYPE "TipoUnidadeOrganizacional" ADD VALUE 'SECRETARIA';
ALTER TYPE "TipoUnidadeOrganizacional" ADD VALUE 'NUCLEO';
ALTER TYPE "TipoUnidadeOrganizacional" ADD VALUE 'SECAO';
ALTER TYPE "TipoUnidadeOrganizacional" ADD VALUE 'SETOR';
ALTER TYPE "TipoUnidadeOrganizacional" ADD VALUE 'SERVICO';
