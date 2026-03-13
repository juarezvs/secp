-- CreateEnum
CREATE TYPE "MotivoEncerramentoSessao" AS ENUM ('LOGOUT', 'FECHAMENTO_CLIENTE', 'TIMEOUT', 'EXPIRADA', 'REVOGADA_ADMIN');

-- CreateEnum
CREATE TYPE "PapelSistema" AS ENUM ('SERVIDOR', 'GESTOR', 'NUTEC', 'SECAP', 'DIREF', 'AUDITOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "RegimeTrabalho" AS ENUM ('PRESENCIAL', 'TELETRABALHO', 'HIBRIDO');

-- CreateEnum
CREATE TYPE "TipoJornada" AS ENUM ('SETE_HORAS', 'OITO_HORAS', 'ESPECIAL', 'DIFERENCIADA');

-- CreateEnum
CREATE TYPE "TipoMarcacao" AS ENUM ('ENTRADA', 'SAIDA', 'SAIDA_INTERVALO', 'RETORNO_INTERVALO');

-- CreateEnum
CREATE TYPE "OrigemMarcacao" AS ENUM ('DISPOSITIVO_BIOMETRICO', 'METODO_ALTERNATIVO', 'EXCECAO_MANUAL');

-- CreateEnum
CREATE TYPE "StatusApuracao" AS ENUM ('OK', 'INCONSISTENTE', 'PENDENTE_REGULARIZACAO', 'HOMOLOGADO', 'FECHADO');

-- CreateEnum
CREATE TYPE "TipoLancamentoBancoHoras" AS ENUM ('CREDITO', 'DEBITO', 'COMPENSACAO', 'EXCEDENTE_SABADO', 'EXCEDENTE_DOMINGO_FERIADO', 'EXCEDENTE_NOTURNO', 'NAO_AUTORIZADO', 'ACIMA_LIMITE', 'AJUSTE');

-- CreateEnum
CREATE TYPE "TipoAutorizacao" AS ENUM ('HORA_EXTRA_CREDITO', 'COMPENSAR_DEBITO', 'FRUIR_CREDITO', 'ATIVIDADE_EXTERNA', 'VIAGEM', 'CAPACITACAO', 'DISPENSA_PONTO', 'REFERENDO_ACIMA_LIMITE');

-- CreateEnum
CREATE TYPE "StatusAutorizacao" AS ENUM ('RASCUNHO', 'ENVIADA', 'APROVADA', 'REJEITADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "TipoUnidadeOrganizacional" AS ENUM ('JUSTICA_FEDERAL', 'SECAO_JUDICIARIA', 'SUBSECAO_JUDICIARIA', 'DEPARTAMENTO', 'SUBDEPARTAMENTO');

-- CreateEnum
CREATE TYPE "StatusArquivoAfd" AS ENUM ('PENDENTE', 'PROCESSANDO', 'CONCLUIDO', 'ERRO');

-- CreateTable
CREATE TABLE "organizacoes" (
    "id" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidades_organizacionais" (
    "id" TEXT NOT NULL,
    "organizacao_id" TEXT NOT NULL,
    "unidade_pai_id" TEXT,
    "gestor_id" TEXT,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "tipo" "TipoUnidadeOrganizacional" NOT NULL,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "unidades_organizacionais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfis_usuarios" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "onboarding_concluido" BOOLEAN NOT NULL DEFAULT false,
    "matricula" TEXT,
    "cpf" TEXT,
    "unidade_organizacional_id" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "perfis_usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "organizacao_id" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "email" TEXT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email_verificado_em" TIMESTAMP(3),
    "papeis" "PapelSistema"[],
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "imagem" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contas" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "provedor" TEXT NOT NULL,
    "conta_provedor_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expira_em" INTEGER,
    "tipo_token" TEXT,
    "escopo" TEXT,
    "id_token" TEXT,
    "estado_sessao" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessoes" (
    "id" TEXT NOT NULL,
    "token_sessao" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "expira_em" TIMESTAMP(3) NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens_verificacao" (
    "identificador" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expira_em" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "autenticadores" (
    "credencial_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "conta_provedor_id" TEXT NOT NULL,
    "chave_publica_credencial" TEXT NOT NULL,
    "contador" INTEGER NOT NULL,
    "tipo_dispositivo" TEXT NOT NULL,
    "backup_realizado" BOOLEAN NOT NULL,
    "transportes" TEXT,

    CONSTRAINT "autenticadores_pkey" PRIMARY KEY ("usuario_id","credencial_id")
);

-- CreateTable
CREATE TABLE "sessoes_auditoria" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "organizacao_id" TEXT NOT NULL,
    "login_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ultimo_acesso_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "encerrada_em" TIMESTAMP(3),
    "motivo_encerramento" "MotivoEncerramentoSessao",
    "ip" TEXT,
    "user_agent" TEXT,
    "jwt_id" TEXT,

    CONSTRAINT "sessoes_auditoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servidores" (
    "id" TEXT NOT NULL,
    "organizacao_id" TEXT NOT NULL,
    "usuario_id" TEXT,
    "unidade_organizacional_id" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "regime_trabalho" "RegimeTrabalho" NOT NULL DEFAULT 'PRESENCIAL',
    "tipo_jornada" "TipoJornada" NOT NULL,
    "comissionado" BOOLEAN NOT NULL DEFAULT false,
    "oficial_justica" BOOLEAN NOT NULL DEFAULT false,
    "dispensa_ponto" BOOLEAN NOT NULL DEFAULT false,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "servidores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jornadas_trabalho" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo_jornada" "TipoJornada" NOT NULL,
    "minutos_por_dia" INTEGER NOT NULL,
    "intervalo_minimo_min" INTEGER,
    "intervalo_maximo_min" INTEGER,
    "flex_entrada_min" INTEGER NOT NULL,
    "flex_saida_min" INTEGER NOT NULL,
    "permite_antes_seis" BOOLEAN NOT NULL DEFAULT false,
    "permite_apos_dezenove" BOOLEAN NOT NULL DEFAULT false,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jornadas_trabalho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atribuicoes_jornada" (
    "id" TEXT NOT NULL,
    "servidor_id" TEXT NOT NULL,
    "jornada_id" TEXT NOT NULL,
    "vigencia_inicio" TIMESTAMP(3) NOT NULL,
    "vigencia_fim" TIMESTAMP(3),

    CONSTRAINT "atribuicoes_jornada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dispositivos_biometricos" (
    "id" TEXT NOT NULL,
    "unidade_organizacional_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "serial" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dispositivos_biometricos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marcacoes_ponto" (
    "id" TEXT NOT NULL,
    "servidor_id" TEXT NOT NULL,
    "ocorrida_em" TIMESTAMP(3) NOT NULL,
    "tipo_marcacao" "TipoMarcacao" NOT NULL,
    "origem_marcacao" "OrigemMarcacao" NOT NULL,
    "dispositivo_id" TEXT,
    "payload_bruto" JSONB,
    "hash_integridade" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "marcacoes_ponto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atividades_externas" (
    "id" TEXT NOT NULL,
    "servidor_id" TEXT NOT NULL,
    "inicio_em" TIMESTAMP(3) NOT NULL,
    "fim_em" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "url_documento_comprovante" TEXT,
    "solicitacao_autorizacao_id" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "atividades_externas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "viagens" (
    "id" TEXT NOT NULL,
    "servidor_id" TEXT NOT NULL,
    "inicio_em" TIMESTAMP(3) NOT NULL,
    "fim_em" TIMESTAMP(3) NOT NULL,
    "destino" TEXT NOT NULL,
    "solicitacao_autorizacao_id" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "viagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "capacitacoes" (
    "id" TEXT NOT NULL,
    "servidor_id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "horas" INTEGER NOT NULL,
    "interna" BOOLEAN NOT NULL,
    "url_documento_comprovante" TEXT,
    "solicitacao_autorizacao_id" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "capacitacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apuracoes_diarias" (
    "id" TEXT NOT NULL,
    "servidor_id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "minutos_previstos" INTEGER NOT NULL,
    "minutos_trabalhados" INTEGER NOT NULL,
    "minutos_intervalo" INTEGER NOT NULL,
    "minutos_debito" INTEGER NOT NULL,
    "minutos_credito" INTEGER NOT NULL,
    "minutos_nao_autorizados" INTEGER NOT NULL,
    "minutos_acima_limite" INTEGER NOT NULL,
    "minutos_excedente_sabado" INTEGER NOT NULL,
    "minutos_excedente_domingo_feriado" INTEGER NOT NULL,
    "minutos_excedente_noturno" INTEGER NOT NULL,
    "status" "StatusApuracao" NOT NULL DEFAULT 'OK',
    "flags" TEXT[],

    CONSTRAINT "apuracoes_diarias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apuracoes_mensais" (
    "id" TEXT NOT NULL,
    "servidor_id" TEXT NOT NULL,
    "referencia_mes" TEXT NOT NULL,
    "minutos_previstos" INTEGER NOT NULL,
    "minutos_trabalhados" INTEGER NOT NULL,
    "minutos_debito" INTEGER NOT NULL,
    "minutos_credito" INTEGER NOT NULL,
    "saldo_minutos" INTEGER NOT NULL,
    "status" "StatusApuracao" NOT NULL DEFAULT 'OK',
    "homologado_em" TIMESTAMP(3),
    "homologado_por" TEXT,

    CONSTRAINT "apuracoes_mensais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lancamentos_banco_horas" (
    "id" TEXT NOT NULL,
    "servidor_id" TEXT NOT NULL,
    "referencia_mes" TEXT NOT NULL,
    "tipo_lancamento" "TipoLancamentoBancoHoras" NOT NULL,
    "minutos" INTEGER NOT NULL,
    "fator" DOUBLE PRECISION,
    "referencia_origem" JSONB,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lancamentos_banco_horas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitacoes_autorizacao" (
    "id" TEXT NOT NULL,
    "servidor_id" TEXT NOT NULL,
    "tipo_autorizacao" "TipoAutorizacao" NOT NULL,
    "status" "StatusAutorizacao" NOT NULL DEFAULT 'RASCUNHO',
    "solicitada_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inicio_em" TIMESTAMP(3),
    "fim_em" TIMESTAMP(3),
    "minutos" INTEGER,
    "justificativa" TEXT NOT NULL,
    "decidida_em" TIMESTAMP(3),
    "decidida_por" TEXT,
    "observacao_decisao" TEXT,

    CONSTRAINT "solicitacoes_autorizacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delegacoes" (
    "id" TEXT NOT NULL,
    "unidade_organizacional_id" TEXT NOT NULL,
    "usuario_delegante_id" TEXT NOT NULL,
    "usuario_delegado_id" TEXT NOT NULL,
    "vigencia_inicio" TIMESTAMP(3) NOT NULL,
    "vigencia_fim" TIMESTAMP(3),
    "observacao" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "delegacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feriados" (
    "id" TEXT NOT NULL,
    "organizacao_id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "nome" TEXT NOT NULL,
    "nacional" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "feriados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs_auditoria" (
    "id" TEXT NOT NULL,
    "organizacao_id" TEXT NOT NULL,
    "usuario_ator_id" TEXT,
    "acao" TEXT NOT NULL,
    "entidade" TEXT NOT NULL,
    "entidade_id" TEXT NOT NULL,
    "dados" JSONB,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_auditoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "importacoes_afd" (
    "id" TEXT NOT NULL,
    "organizacao_id" TEXT NOT NULL,
    "origem" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "importacoes_afd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arquivos_afd" (
    "id" TEXT NOT NULL,
    "importacao_id" TEXT NOT NULL,
    "nome_original" TEXT NOT NULL,
    "nome_armazenado" TEXT NOT NULL,
    "caminho_arquivo" TEXT NOT NULL,
    "sha256" TEXT NOT NULL,
    "tamanho_bytes" INTEGER NOT NULL,
    "mime_type" TEXT,
    "texto_bruto" TEXT,
    "json_parseado" JSONB,
    "status" "StatusArquivoAfd" NOT NULL DEFAULT 'PENDENTE',
    "mensagem_erro" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processado_em" TIMESTAMP(3),

    CONSTRAINT "arquivos_afd_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizacoes_sigla_key" ON "organizacoes"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "unidades_organizacionais_sigla_key" ON "unidades_organizacionais"("sigla");

-- CreateIndex
CREATE INDEX "idx_unidades_organizacao_pai" ON "unidades_organizacionais"("organizacao_id", "unidade_pai_id");

-- CreateIndex
CREATE INDEX "idx_unidades_organizacao_tipo" ON "unidades_organizacionais"("organizacao_id", "tipo");

-- CreateIndex
CREATE UNIQUE INDEX "perfis_usuarios_usuario_id_key" ON "perfis_usuarios"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_matricula_key" ON "usuarios"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "uk_contas_provedor_conta" ON "contas"("provedor", "conta_provedor_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessoes_token_sessao_key" ON "sessoes"("token_sessao");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_verificacao_token_key" ON "tokens_verificacao"("token");

-- CreateIndex
CREATE UNIQUE INDEX "uk_tokens_verificacao_identificador_token" ON "tokens_verificacao"("identificador", "token");

-- CreateIndex
CREATE UNIQUE INDEX "autenticadores_credencial_id_key" ON "autenticadores"("credencial_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessoes_auditoria_jwt_id_key" ON "sessoes_auditoria"("jwt_id");

-- CreateIndex
CREATE INDEX "idx_sessoes_auditoria_usuario_ultimo_acesso" ON "sessoes_auditoria"("usuario_id", "ultimo_acesso_em");

-- CreateIndex
CREATE INDEX "idx_sessoes_auditoria_encerrada_em" ON "sessoes_auditoria"("encerrada_em");

-- CreateIndex
CREATE UNIQUE INDEX "servidores_usuario_id_key" ON "servidores"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "servidores_matricula_key" ON "servidores"("matricula");

-- CreateIndex
CREATE INDEX "idx_servidores_organizacao_unidade" ON "servidores"("organizacao_id", "unidade_organizacional_id");

-- CreateIndex
CREATE INDEX "idx_atribuicoes_jornada_servidor_vigencia" ON "atribuicoes_jornada"("servidor_id", "vigencia_inicio");

-- CreateIndex
CREATE UNIQUE INDEX "dispositivos_biometricos_serial_key" ON "dispositivos_biometricos"("serial");

-- CreateIndex
CREATE INDEX "idx_marcacoes_servidor_ocorrida" ON "marcacoes_ponto"("servidor_id", "ocorrida_em");

-- CreateIndex
CREATE UNIQUE INDEX "atividades_externas_solicitacao_autorizacao_id_key" ON "atividades_externas"("solicitacao_autorizacao_id");

-- CreateIndex
CREATE UNIQUE INDEX "viagens_solicitacao_autorizacao_id_key" ON "viagens"("solicitacao_autorizacao_id");

-- CreateIndex
CREATE UNIQUE INDEX "capacitacoes_solicitacao_autorizacao_id_key" ON "capacitacoes"("solicitacao_autorizacao_id");

-- CreateIndex
CREATE UNIQUE INDEX "uk_apuracoes_diarias_servidor_data" ON "apuracoes_diarias"("servidor_id", "data");

-- CreateIndex
CREATE UNIQUE INDEX "uk_apuracoes_mensais_servidor_mes" ON "apuracoes_mensais"("servidor_id", "referencia_mes");

-- CreateIndex
CREATE INDEX "idx_lancamentos_banco_horas_servidor_mes" ON "lancamentos_banco_horas"("servidor_id", "referencia_mes");

-- CreateIndex
CREATE INDEX "idx_solicitacoes_autorizacao_servidor_tipo_status" ON "solicitacoes_autorizacao"("servidor_id", "tipo_autorizacao", "status");

-- CreateIndex
CREATE INDEX "idx_delegacoes_unidade_vigencia" ON "delegacoes"("unidade_organizacional_id", "vigencia_inicio");

-- CreateIndex
CREATE UNIQUE INDEX "uk_feriados_organizacao_data" ON "feriados"("organizacao_id", "data");

-- CreateIndex
CREATE INDEX "idx_logs_auditoria_organizacao_criado_em" ON "logs_auditoria"("organizacao_id", "criado_em");

-- AddForeignKey
ALTER TABLE "unidades_organizacionais" ADD CONSTRAINT "unidades_organizacionais_organizacao_id_fkey" FOREIGN KEY ("organizacao_id") REFERENCES "organizacoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unidades_organizacionais" ADD CONSTRAINT "unidades_organizacionais_unidade_pai_id_fkey" FOREIGN KEY ("unidade_pai_id") REFERENCES "unidades_organizacionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unidades_organizacionais" ADD CONSTRAINT "unidades_organizacionais_gestor_id_fkey" FOREIGN KEY ("gestor_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfis_usuarios" ADD CONSTRAINT "perfis_usuarios_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfis_usuarios" ADD CONSTRAINT "perfis_usuarios_unidade_organizacional_id_fkey" FOREIGN KEY ("unidade_organizacional_id") REFERENCES "unidades_organizacionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_organizacao_id_fkey" FOREIGN KEY ("organizacao_id") REFERENCES "organizacoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessoes" ADD CONSTRAINT "sessoes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "autenticadores" ADD CONSTRAINT "autenticadores_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessoes_auditoria" ADD CONSTRAINT "sessoes_auditoria_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessoes_auditoria" ADD CONSTRAINT "sessoes_auditoria_organizacao_id_fkey" FOREIGN KEY ("organizacao_id") REFERENCES "organizacoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servidores" ADD CONSTRAINT "servidores_organizacao_id_fkey" FOREIGN KEY ("organizacao_id") REFERENCES "organizacoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servidores" ADD CONSTRAINT "servidores_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servidores" ADD CONSTRAINT "servidores_unidade_organizacional_id_fkey" FOREIGN KEY ("unidade_organizacional_id") REFERENCES "unidades_organizacionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atribuicoes_jornada" ADD CONSTRAINT "atribuicoes_jornada_servidor_id_fkey" FOREIGN KEY ("servidor_id") REFERENCES "servidores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atribuicoes_jornada" ADD CONSTRAINT "atribuicoes_jornada_jornada_id_fkey" FOREIGN KEY ("jornada_id") REFERENCES "jornadas_trabalho"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispositivos_biometricos" ADD CONSTRAINT "dispositivos_biometricos_unidade_organizacional_id_fkey" FOREIGN KEY ("unidade_organizacional_id") REFERENCES "unidades_organizacionais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marcacoes_ponto" ADD CONSTRAINT "marcacoes_ponto_servidor_id_fkey" FOREIGN KEY ("servidor_id") REFERENCES "servidores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marcacoes_ponto" ADD CONSTRAINT "marcacoes_ponto_dispositivo_id_fkey" FOREIGN KEY ("dispositivo_id") REFERENCES "dispositivos_biometricos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atividades_externas" ADD CONSTRAINT "atividades_externas_servidor_id_fkey" FOREIGN KEY ("servidor_id") REFERENCES "servidores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atividades_externas" ADD CONSTRAINT "atividades_externas_solicitacao_autorizacao_id_fkey" FOREIGN KEY ("solicitacao_autorizacao_id") REFERENCES "solicitacoes_autorizacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viagens" ADD CONSTRAINT "viagens_servidor_id_fkey" FOREIGN KEY ("servidor_id") REFERENCES "servidores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viagens" ADD CONSTRAINT "viagens_solicitacao_autorizacao_id_fkey" FOREIGN KEY ("solicitacao_autorizacao_id") REFERENCES "solicitacoes_autorizacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacitacoes" ADD CONSTRAINT "capacitacoes_servidor_id_fkey" FOREIGN KEY ("servidor_id") REFERENCES "servidores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacitacoes" ADD CONSTRAINT "capacitacoes_solicitacao_autorizacao_id_fkey" FOREIGN KEY ("solicitacao_autorizacao_id") REFERENCES "solicitacoes_autorizacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apuracoes_diarias" ADD CONSTRAINT "apuracoes_diarias_servidor_id_fkey" FOREIGN KEY ("servidor_id") REFERENCES "servidores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apuracoes_mensais" ADD CONSTRAINT "apuracoes_mensais_servidor_id_fkey" FOREIGN KEY ("servidor_id") REFERENCES "servidores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lancamentos_banco_horas" ADD CONSTRAINT "lancamentos_banco_horas_servidor_id_fkey" FOREIGN KEY ("servidor_id") REFERENCES "servidores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacoes_autorizacao" ADD CONSTRAINT "solicitacoes_autorizacao_servidor_id_fkey" FOREIGN KEY ("servidor_id") REFERENCES "servidores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delegacoes" ADD CONSTRAINT "delegacoes_unidade_organizacional_id_fkey" FOREIGN KEY ("unidade_organizacional_id") REFERENCES "unidades_organizacionais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delegacoes" ADD CONSTRAINT "delegacoes_usuario_delegante_id_fkey" FOREIGN KEY ("usuario_delegante_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delegacoes" ADD CONSTRAINT "delegacoes_usuario_delegado_id_fkey" FOREIGN KEY ("usuario_delegado_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feriados" ADD CONSTRAINT "feriados_organizacao_id_fkey" FOREIGN KEY ("organizacao_id") REFERENCES "organizacoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs_auditoria" ADD CONSTRAINT "logs_auditoria_organizacao_id_fkey" FOREIGN KEY ("organizacao_id") REFERENCES "organizacoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs_auditoria" ADD CONSTRAINT "logs_auditoria_usuario_ator_id_fkey" FOREIGN KEY ("usuario_ator_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "importacoes_afd" ADD CONSTRAINT "importacoes_afd_organizacao_id_fkey" FOREIGN KEY ("organizacao_id") REFERENCES "organizacoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arquivos_afd" ADD CONSTRAINT "arquivos_afd_importacao_id_fkey" FOREIGN KEY ("importacao_id") REFERENCES "importacoes_afd"("id") ON DELETE CASCADE ON UPDATE CASCADE;
