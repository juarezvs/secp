import "dotenv/config";
import { prisma } from "@/app/_kernel/db/prisma/client";
import {
  PapelSistema,
  RegimeTrabalho,
  TipoJornada,
  TipoUnidadeOrganizacional,
} from "@/app/_kernel/db/prisma/generated/prisma/enums";

async function main() {
  console.log("🌱 Iniciando seed da estrutura JFAM...");
  console.log("DATABASE_URL bruta:", process.env.DATABASE_URL);

  // 1) ORGANIZAÇÃO
  const organizacao = await prisma.organizacao.upsert({
    where: { sigla: "JFAM" },
    update: {
      nome: "Justiça Federal do Amazonas",
      ativa: true,
    },
    create: {
      sigla: "JFAM",
      nome: "Justiça Federal do Amazonas",
      ativa: true,
    },
  });

  console.log(`✅ Organização criada/atualizada: ${organizacao.nome}`);

  // 2) UNIDADE RAIZ JFAM
  const unidadeJfam = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "JFAM-ROOT" },
    update: {
      nome: "Justiça Federal do Amazonas",
      tipo: TipoUnidadeOrganizacional.JUSTICA_FEDERAL,
      ativa: true,
      organizacaoId: organizacao.id,
    },
    create: {
      nome: "Justiça Federal do Amazonas",
      sigla: "JFAM-ROOT",
      tipo: TipoUnidadeOrganizacional.JUSTICA_FEDERAL,
      ativa: true,
      organizacaoId: organizacao.id,
    },
  });

  // 3) SJAM
  const sjam = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SJAM" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: unidadeJfam.id,
      nome: "Seção Judiciária do Amazonas",
      tipo: TipoUnidadeOrganizacional.SECAO_JUDICIARIA,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: unidadeJfam.id,
      nome: "Seção Judiciária do Amazonas",
      sigla: "SJAM",
      tipo: TipoUnidadeOrganizacional.SECAO_JUDICIARIA,
      ativa: true,
    },
  });

  // 4) SUBSEÇÕES
  const ssjtbt = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SSJTBT" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: sjam.id,
      nome: "Subseção Judiciária de Tabatinga",
      tipo: TipoUnidadeOrganizacional.SUBSECAO_JUDICIARIA,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: sjam.id,
      nome: "Subseção Judiciária de Tabatinga",
      sigla: "SSJTBT",
      tipo: TipoUnidadeOrganizacional.SUBSECAO_JUDICIARIA,
      ativa: true,
    },
  });

  // 5) DEPARTAMENTOS DE EXEMPLO DA SJAM
  const diref = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "DIREF" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: sjam.id,
      nome: "Diretoria do Foro",
      tipo: TipoUnidadeOrganizacional.DIRETORIA,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: sjam.id,
      nome: "Diretoria do Foro",
      sigla: "DIREF",
      tipo: TipoUnidadeOrganizacional.DIRETORIA,
      ativa: true,
    },
  });

  const asjur = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "ASJUR" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: diref.id,
      nome: "Assistência Jurídica",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: diref.id,
      nome: "Assistência Jurídica",
      sigla: "ASJUR",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const uaa_tefe = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "UAA-TEFE" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: diref.id,
      nome: "Unidade Avançada de Atendimento de Tefé",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: diref.id,
      nome: "Unidade Avançada de Atendimento de Tefé",
      sigla: "UAA-TEFE",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const secos = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SECOS" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: diref.id,
      nome: "Seção de Comunicação Social",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: diref.id,
      nome: "Seção de Comunicação Social",
      sigla: "SECOS",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const secad = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SECAD" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: diref.id,
      nome: "Secretaria Administrativa",
      tipo: TipoUnidadeOrganizacional.SECRETARIA,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: diref.id,
      nome: "Secretaria Administrativa",
      sigla: "SECAD",
      tipo: TipoUnidadeOrganizacional.SECRETARIA,
      ativa: true,
    },
  });

  const secob = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SECOB" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: secad.id,
      nome: "Seção de Contabilidade",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: secad.id,
      nome: "Seção de Contabilidade",
      sigla: "SECOB",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const semad = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SEMAD" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: secad.id,
      nome: "Seção de Modernização Administrativa",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: secad.id,
      nome: "Seção de Modernização Administrativa",
      sigla: "SEMAD",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const setamb = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SETAMB" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: semad.id,
      nome: "Setor de Apoio à Gestão Socioambiental",
      tipo: TipoUnidadeOrganizacional.SETOR,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: semad.id,
      nome: "Setor de Apoio à Gestão Socioambiental",
      sigla: "SETAMB",
      tipo: TipoUnidadeOrganizacional.SETOR,
      ativa: true,
    },
  });

  const sesud_secad = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SESUD_SECAD" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: semad.id,
      nome: "Seção de Suporte Administrativo",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: semad.id,
      nome: "Seção de Suporte Administrativo",
      sigla: "SESUD_SECAD",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const selic = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SELIC" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: semad.id,
      nome: "Seção de Licitações e Contratos",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: semad.id,
      nome: "Seção de Licitações e Contratos",
      sigla: "SELIC",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const nutec = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "NUTEC" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: secad.id,
      nome: "Núcleo de Tecnologia da Informação",
      tipo: TipoUnidadeOrganizacional.NUCLEO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: secad.id,
      nome: "Núcleo de Tecnologia da Informação",
      sigla: "NUTEC",
      tipo: TipoUnidadeOrganizacional.NUCLEO,
      ativa: true,
    },
  });

  const sesis = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SESIS" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: nutec.id,
      nome: "Seção de Sistemas, Infraestrutura e Suporte Técnico",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: nutec.id,
      nome: "Seção de Sistemas, Infraestrutura e Suporte Técnico",
      sigla: "SESIS",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const sersei = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SERSEI" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: sesis.id,
      nome: "Serviço de Segurança da Informação e Infraestrutura",
      tipo: TipoUnidadeOrganizacional.SERVICO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: sesis.id,
      nome: "Serviço de Segurança da Informação e Infraestrutura",
      sigla: "SERSEI",
      tipo: TipoUnidadeOrganizacional.SERVICO,
      ativa: true,
    },
  });

  const sersup = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SERSUP" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: sesis.id,
      nome: "Serviço de Suporte Técnico e Sistemas",
      tipo: TipoUnidadeOrganizacional.SERVICO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: sesis.id,
      nome: "Serviço de Suporte Técnico e Sistemas",
      sigla: "SERSUP",
      tipo: TipoUnidadeOrganizacional.SERVICO,
      ativa: true,
    },
  });

  const nucgp = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "NUCGP" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: secad.id,
      nome: "Núcleo de Gestão de Pessoal",
      tipo: TipoUnidadeOrganizacional.NUCLEO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: secad.id,
      nome: "Núcleo de Gestão de Pessoal",
      sigla: "NUCGP",
      tipo: TipoUnidadeOrganizacional.NUCLEO,
      ativa: true,
    },
  });

  const nucad = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "NUCAD" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: secad.id,
      nome: "Núcleo de Administração",
      tipo: TipoUnidadeOrganizacional.NUCLEO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: secad.id,
      nome: "Núcleo de Administração",
      sigla: "NUCAD",
      tipo: TipoUnidadeOrganizacional.NUCLEO,
      ativa: true,
    },
  });

  const nucju = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "NUCJU" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: secad.id,
      nome: "Núcleo Judiciário",
      tipo: TipoUnidadeOrganizacional.NUCLEO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: secad.id,
      nome: "Núcleo Judiciário",
      sigla: "NUCJU",
      tipo: TipoUnidadeOrganizacional.NUCLEO,
      ativa: true,
    },
  });

  const secap = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SECAP" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucgp.id,
      nome: "Seção de Cadastro de Pessoal",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucgp.id,
      nome: "Seção de Cadastro de Pessoal",
      sigla: "SECAP",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const sepag = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SEPAG" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucgp.id,
      nome: "Seção de Pagamento de Pessoal",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucgp.id,
      nome: "Seção de Pagamento de Pessoal",
      sigla: "SEPAG",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const selep = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SELEP" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucgp.id,
      nome: "Seção de Legislação de Pessoal",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucgp.id,
      nome: "Seção de Legislação de Pessoal",
      sigla: "SELEP",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const seder = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SEDER" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucgp.id,
      nome: "Seção de Desenvolvimento e Avaliação de Recursos Humanos",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucgp.id,
      nome: "Seção de Desenvolvimento e Avaliação de Recursos Humanos",
      sigla: "SEDER",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const sebes = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SEBES" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucgp.id,
      nome: "Seção de Bem-Estar Social",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucgp.id,
      nome: "Seção de Bem-Estar Social",
      sigla: "SEBES",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const sepol = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SEPOL" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucad.id,
      nome: "Seção de Apoio à Polícia Judicial",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucad.id,
      nome: "Seção de Apoio à Polícia Judicial",
      sigla: "SEPOL",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const seseg = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SESEG" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucad.id,
      nome: "Seção de Serviços Gerais",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucad.id,
      nome: "Seção de Serviços Gerais",
      sigla: "SESEG",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const setgop = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SETGOP" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: seseg.id,
      nome: "Setor de Gestão de Obras e Projetos",
      tipo: TipoUnidadeOrganizacional.SETOR,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: seseg.id,
      nome: "Setor de Gestão de Obras e Projetos",
      sigla: "SETGOP",
      tipo: TipoUnidadeOrganizacional.SETOR,
      ativa: true,
    },
  });

  const setcom = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SETCOM" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: seseg.id,
      nome: "Setor de Comunicações",
      tipo: TipoUnidadeOrganizacional.SETOR,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: seseg.id,
      nome: "Setor de Comunicações",
      sigla: "SETCOM",
      tipo: TipoUnidadeOrganizacional.SETOR,
      ativa: true,
    },
  });

  const semap = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SEMAP" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucad.id,
      nome: "Seção de Material e Patrimônio",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucad.id,
      nome: "Seção de Material e Patrimônio",
      sigla: "SEMAP",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const secom = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SECOM" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucad.id,
      nome: "Seção de Compras",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucad.id,
      nome: "Seção de Compras",
      sigla: "SECOM",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const seofi = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SEOFI" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucad.id,
      nome: "Seção de Execução Orçamentária e Financeira",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucad.id,
      nome: "Seção de Execução Orçamentária e Financeira",
      sigla: "SEOFI",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const seplo = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SEPLO" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucad.id,
      nome: "Seção de Planejamento Orçamentário e Financeiro",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucad.id,
      nome: "Seção de Planejamento Orçamentário e Financeiro",
      sigla: "SEPLO",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const ceman = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "CEMAN" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucju.id,
      nome: "Central de Mandados",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucju.id,
      nome: "Central de Mandados",
      sigla: "CEMAN",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const sedaj = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SEDAJ" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucju.id,
      nome: "Seção de Depósito e Arquivo Judicial e Administrativo",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucju.id,
      nome: "Seção de Depósito e Arquivo Judicial e Administrativo",
      sigla: "SEDAJ",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const secaj = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SECAJ" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucju.id,
      nome: "Seção de Cálculos Judiciais",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucju.id,
      nome: "Seção de Cálculos Judiciais",
      sigla: "SECAJ",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const secla = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SECLA" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucju.id,
      nome: "Seção de Classificação, Distribuição, Protocolos e Certidões",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: nucju.id,
      nome: "Seção de Classificação, Distribuição, Protocolos e Certidões",
      sigla: "SECLA",
      tipo: TipoUnidadeOrganizacional.SECAO,
      ativa: true,
    },
  });

  const setpce = await prisma.unidadeOrganizacional.upsert({
    where: { sigla: "SETPCE" },
    update: {
      organizacaoId: organizacao.id,
      unidadePaiId: secla.id,
      nome: "Setor de Protocolos e Certidões",
      tipo: TipoUnidadeOrganizacional.SETOR,
      ativa: true,
    },
    create: {
      organizacaoId: organizacao.id,
      unidadePaiId: secla.id,
      nome: "Setor de Protocolos e Certidões",
      sigla: "SETPCE",
      tipo: TipoUnidadeOrganizacional.SETOR,
      ativa: true,
    },
  });

  console.log("✅ Estrutura organizacional criada.");

  // 7) JORNADAS PADRÃO
  const jornada7h = await prisma.jornadaTrabalho.upsert({
    where: { id: "jornada-7h-padrao" },
    update: {
      nome: "Jornada padrão de 7 horas",
      tipoJornada: TipoJornada.SETE_HORAS,
      minutosPorDia: 420,
      intervaloMinimoMin: 0,
      intervaloMaximoMin: 0,
      flexEntradaMin: 120,
      flexSaidaMin: 60,
      permiteAntesSeis: false,
      permiteAposDezenove: false,
    },
    create: {
      id: "jornada-7h-padrao",
      nome: "Jornada padrão de 7 horas",
      tipoJornada: TipoJornada.SETE_HORAS,
      minutosPorDia: 420,
      intervaloMinimoMin: 0,
      intervaloMaximoMin: 0,
      flexEntradaMin: 120,
      flexSaidaMin: 60,
      permiteAntesSeis: false,
      permiteAposDezenove: false,
    },
  });

  const jornada8h = await prisma.jornadaTrabalho.upsert({
    where: { id: "jornada-8h-padrao" },
    update: {
      nome: "Jornada padrão de 8 horas",
      tipoJornada: TipoJornada.OITO_HORAS,
      minutosPorDia: 480,
      intervaloMinimoMin: 60,
      intervaloMaximoMin: 180,
      flexEntradaMin: 120,
      flexSaidaMin: 60,
      permiteAntesSeis: false,
      permiteAposDezenove: false,
    },
    create: {
      id: "jornada-8h-padrao",
      nome: "Jornada padrão de 8 horas",
      tipoJornada: TipoJornada.OITO_HORAS,
      minutosPorDia: 480,
      intervaloMinimoMin: 60,
      intervaloMaximoMin: 180,
      flexEntradaMin: 120,
      flexSaidaMin: 60,
      permiteAntesSeis: false,
      permiteAposDezenove: false,
    },
  });

  console.log("✅ Jornadas criadas.");

  // 8) FERIADOS EXEMPLO
  const feriados = [
    {
      data: new Date("2026-01-01T00:00:00.000Z"),
      nome: "Confraternização Universal",
      nacional: true,
    },
    {
      data: new Date("2026-04-21T00:00:00.000Z"),
      nome: "Tiradentes",
      nacional: true,
    },
    {
      data: new Date("2026-05-01T00:00:00.000Z"),
      nome: "Dia do Trabalhador",
      nacional: true,
    },
    {
      data: new Date("2026-09-05T00:00:00.000Z"),
      nome: "Elevação do Amazonas à Categoria de Província",
      nacional: false,
    },
    {
      data: new Date("2026-11-02T00:00:00.000Z"),
      nome: "Finados",
      nacional: true,
    },
    {
      data: new Date("2026-11-15T00:00:00.000Z"),
      nome: "Proclamação da República",
      nacional: true,
    },
    {
      data: new Date("2026-12-08T00:00:00.000Z"),
      nome: "Justiça",
      nacional: false,
    },
    {
      data: new Date("2026-12-25T00:00:00.000Z"),
      nome: "Natal",
      nacional: true,
    },
  ];

  for (const feriado of feriados) {
    await prisma.feriado.upsert({
      where: {
        organizacaoId_data: {
          organizacaoId: organizacao.id,
          data: feriado.data,
        },
      },
      update: {
        nome: feriado.nome,
        nacional: feriado.nacional,
      },
      create: {
        organizacaoId: organizacao.id,
        data: feriado.data,
        nome: feriado.nome,
        nacional: feriado.nacional,
      },
    });
  }

  console.log("✅ Feriados criados.");

  // 9) USUÁRIOS EXEMPLO
  const juarez = await prisma.usuario.upsert({
    where: { matricula: "am200401" },
    update: {
      organizacaoId: organizacao.id,
      nome: "Juarez de Vasconcelos da Silva",
      email: "juarez.silva@trf1.jus.br",
      cpf: "65717422253",
      papel: PapelSistema.GESTOR,
      ativo: true,
    },
    create: {
      organizacaoId: organizacao.id,
      matricula: "AM200401",
      nome: "JUAREZ DE VASCONCELOS DA SILVA",
      email: "nutec.am@trf1.jus.br",
      cpf: "65717422253",
      papel: PapelSistema.GESTOR,
      ativo: true,
    },
  });

  const adelson = await prisma.usuario.upsert({
    where: { matricula: "AM24403" },
    update: {
      organizacaoId: organizacao.id,
      nome: "ADELSON ALVES SILVA",
      email: "nucad.am@trf1.jus.br",
      cpf: "21552533204",
      papel: PapelSistema.GESTOR,
      ativo: true,
    },
    create: {
      organizacaoId: organizacao.id,
      matricula: "AM24403",
      nome: "ADELSON ALVES SILVA",
      email: "nucad.am@trf1.jus.br",
      cpf: "21552533204",
      papel: PapelSistema.GESTOR,
      ativo: true,
    },
  });

  console.log("✅ Usuários criados.");
  // 10) VINCULAR GESTORES ÀS UNIDADES
  await prisma.unidadeOrganizacional.update({
    where: { id: nutec.id },
    data: { gestorId: juarez.id },
  });

  await prisma.unidadeOrganizacional.update({
    where: { id: nucad.id },
    data: { gestorId: adelson.id },
  });
  console.log("✅ Gestores vinculados.");
  // 11) PERFIS DE USUÁRIO
  await prisma.perfilUsuario.upsert({
    where: { usuarioId: juarez.id },
    update: {
      onboardingConcluido: true,
      matricula: juarez.matricula,
      cpf: juarez.cpf,
      unidadeOrganizacionalId: sjam.id,
    },
    create: {
      usuarioId: juarez.id,
      onboardingConcluido: true,
      matricula: juarez.matricula,
      cpf: juarez.cpf,
      unidadeOrganizacionalId: sjam.id,
    },
  });
  console.log("✅ perfis vinculados.");
  // 12) SERVIDORES EXEMPLO
  const servidorJuarez = await prisma.servidor.upsert({
    where: { matricula: "AM200401" },
    update: {
      organizacaoId: organizacao.id,
      usuarioId: juarez.id,
      unidadeOrganizacionalId: nutec.id,
      regimeTrabalho: RegimeTrabalho.PRESENCIAL,
      tipoJornada: TipoJornada.SETE_HORAS,
      comissionado: false,
      oficialJustica: false,
      dispensaPonto: false,
    },
    create: {
      organizacaoId: organizacao.id,
      usuarioId: juarez.id,
      unidadeOrganizacionalId: nutec.id,
      matricula: "AM200401",
      regimeTrabalho: RegimeTrabalho.PRESENCIAL,
      tipoJornada: TipoJornada.SETE_HORAS,
      comissionado: false,
      oficialJustica: false,
      dispensaPonto: false,
    },
  });

  const servidorAdelson = await prisma.servidor.upsert({
    where: { matricula: "AM24403" },
    update: {
      organizacaoId: organizacao.id,
      usuarioId: adelson.id,
      unidadeOrganizacionalId: nucad.id,
      regimeTrabalho: RegimeTrabalho.HIBRIDO,
      tipoJornada: TipoJornada.SETE_HORAS,
      comissionado: false,
      oficialJustica: false,
      dispensaPonto: false,
    },
    create: {
      organizacaoId: organizacao.id,
      usuarioId: adelson.id,
      unidadeOrganizacionalId: nucad.id,
      matricula: "AM24403",
      regimeTrabalho: RegimeTrabalho.HIBRIDO,
      tipoJornada: TipoJornada.SETE_HORAS,
      comissionado: false,
      oficialJustica: false,
      dispensaPonto: false,
    },
  });
  console.log("✅ servidores vinculados.");
  // 13) ATRIBUIÇÕES DE JORNADA
  await prisma.atribuicaoJornada.upsert({
    where: { id: "atr-000001" },
    update: {
      servidorId: servidorJuarez.id,
      jornadaId: jornada7h.id,
      vigenciaIni: new Date("2026-01-01T00:00:00.000Z"),
      vigenciaFim: null,
    },
    create: {
      id: "atr-000001",
      servidorId: servidorJuarez.id,
      jornadaId: jornada7h.id,
      vigenciaIni: new Date("2026-01-01T00:00:00.000Z"),
      vigenciaFim: null,
    },
  });

  await prisma.atribuicaoJornada.upsert({
    where: { id: "atr-000002" },
    update: {
      servidorId: servidorAdelson.id,
      jornadaId: jornada7h.id,
      vigenciaIni: new Date("2026-01-01T00:00:00.000Z"),
      vigenciaFim: null,
    },
    create: {
      id: "atr-000002",
      servidorId: servidorAdelson.id,
      jornadaId: jornada7h.id,
      vigenciaIni: new Date("2026-01-01T00:00:00.000Z"),
      vigenciaFim: null,
    },
  });
  console.log("✅ jornadas atribuídas.");
  // 14) DISPOSITIVOS BIOMÉTRICOS EXEMPLO
  await prisma.dispositivoBiometrico.upsert({
    where: { serial: "REP-SJAM-001" },
    update: {
      unidadeOrganizacionalId: sjam.id,
      nome: "REP Portaria SJAM",
      ativo: true,
    },
    create: {
      unidadeOrganizacionalId: sjam.id,
      nome: "REP Portaria SJAM",
      serial: "REP-SJAM-001",
      ativo: true,
    },
  });

  await prisma.dispositivoBiometrico.upsert({
    where: { serial: "REP-TBT-001" },
    update: {
      unidadeOrganizacionalId: ssjtbt.id,
      nome: "REP Subseção Tabatinga",
      ativo: true,
    },
    create: {
      unidadeOrganizacionalId: ssjtbt.id,
      nome: "REP Subseção Tabatinga",
      serial: "REP-TBT-001",
      ativo: true,
    },
  });

  console.log("✅ Usuários, servidores, jornadas e dispositivos criados.");
  console.log("🎉 Seed finalizado com sucesso.");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
