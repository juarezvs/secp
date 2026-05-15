# SECP Nacional Multempresa — Especificação Técnica, Requisitos e Modelagem Prisma

## 1. Prompt melhorado para reutilizar em qualquer IA

> Você é um arquiteto de software especialista em sistemas governamentais, controle eletrônico de frequência, legislação administrativa, modelagem de dados PostgreSQL/Prisma, DDD, SOLID, autenticação corporativa LDAP/Active Directory e integrações com sistemas legados Oracle/SARH.  
> 
> Considerando um sistema chamado **SECP — Sistema Eletrônico de Controle de Ponto**, que deverá funcionar como plataforma **nacional, multempresa/multiórgão e parametrizável por portarias locais**, crie uma especificação completa com:  
> 
> 1. Um `schema.prisma` completo para PostgreSQL, usando Prisma, com separação lógica em schemas `auth`, `secp`, `integracao` e `audit`, preparado para multiempresa, múltiplas unidades organizacionais, múltiplos perfis por usuário, alternância de perfil, delegação de perfil administrativo por gestor, autenticação via AD/LDAP por órgão/unidade, integração opcional com Oracle/SARH, relógios biométricos, totens faciais, importação AFD, banco de horas, espelho de ponto, recesso forense, homologação, auditoria e documentos SEI.  
> 2. Tabela de requisitos funcionais e não funcionais por perfil, correlacionando cada requisito com a Portaria SJAM-DIREF 135/2025 como regra-base da JFAM, mas mantendo o sistema parametrizável para outros órgãos.  
> 3. Sequência lógica de construção incremental da aplicação, priorizando uma V1 mínima que permita cadastrar empresa/unidade/AD, importar ou cadastrar servidores, registrar marcações, visualizar marcações e espelho de ponto, e depois evoluir para banco de horas, homologação, workflow, recesso, integração SARH, AFD, totem facial e auditoria avançada.  
> 4. Explicação de cada grupo de models do Prisma, descrevendo finalidade, propriedades principais e exemplos reais de preenchimento.  
> 5. Regras críticas: base inicialmente vazia com usuário `SECP_MASTER` e senha inicial `SECP_MASTER`; após existir empresa/unidade, tela de login deve exigir órgão, username e senha; cada órgão pode ter múltiplos servidores AD por prioridade; integração Oracle/SARH é opcional; usuários podem ter múltiplos perfis e alternar entre eles; ajustes manuais de ponto aprovados devem permanecer mesmo após nova sincronização com relógios; DIREF pode autorizar lançamento manual de banco de horas baseado em documento formal SEI; servidor pode registrar várias marcações no mesmo dia por origens diferentes; não deve haver limite técnico de marcações por dia; o espelho deve exibir origem e método de cada marcação; recesso forense 20/12 a 06/01 deve gerar espelhos próprios para convocados e separar visualmente o período de recesso no espelho mensal comum.

---

## 2. Premissas normativas e de domínio

A Portaria SJAM-DIREF 135/2025 regulamenta expediente, jornada, controle eletrônico de frequência e banco de horas no âmbito da SJAM, Subseção Judiciária de Tabatinga e UAA de Tefé. Ela exige controle eletrônico por equipamento biométrico, admite meio alternativo idôneo em caso de impossibilidade técnica, trata de jornada de 7h ou 8h, intervalo de 1h a 3h, horário diferenciado entre 6h e 19h, banco de horas, limite mensal de 16h de crédito, compensação em até 3 meses, homologação mensal, correção de falha de marcação até o prazo do boletim, acesso ao espelho pelo servidor e acompanhamento pelos superiores hierárquicos.

Para tornar o SECP nacional, essas regras não devem ficar hardcoded. Elas entram como valores padrão em `RegraPortaria`, podendo ser sobrescritas por empresa ou unidade.

---

## 3. Tabela de requisitos funcionais por perfil

| Código | Perfil principal | Requisito funcional | Correlação com Portaria DIREF | Exemplo real |
|---|---|---|---|---|
| RF01 | SECP_MASTER | Permitir primeiro acesso com usuário `SECP_MASTER` em base vazia para cadastrar a primeira empresa, perfis, permissões e parâmetros mínimos. | Necessidade operacional de pleno funcionamento do sistema. | Ao instalar o sistema, login local com `SECP_MASTER/SECP_MASTER`, troca obrigatória de senha, cadastro da JFAM. |
| RF02 | ADMIN_ORGAO / NUTEC | Cadastrar empresa/órgão e unidades organizacionais hierárquicas. | Art. 1º e art. 17 referem SJAM, Tabatinga, Tefé e unidades organizacionais. | Empresa `JFAM`; unidades `SJAM`, `SSJ Tabatinga`, `UAA Tefé`, `NUTEC`, `SECAP`. |
| RF03 | ADMIN_ORGAO / NUTEC | Configurar múltiplos servidores AD/LDAP por empresa ou unidade, com prioridade e fallback. | Art. 20 atribui ao NUTEC gerenciar sistema, usuários e funcionamento. | `srvdc1-am` prioridade 1; `srvdc2-am` prioridade 2. |
| RF04 | ADMIN_ORGAO / INTEGRACAO | Configurar integração opcional Oracle/SARH para importar servidores, cargos, funções e lotações. | Art. 20, II, exige conferência com dados do SARH pela SECAP/NucGP. | JFAM informa string Oracle criptografada para importar matrícula, cargo, lotação. |
| RF05 | ADMIN_ORGAO / NUTEC | Cadastrar servidores, matrícula, cargo, função, lotação, regime e jornada. | Arts. 4º, 5º, 6º, 8º e 18. | Servidor matrícula `AM12345`, lotado no `NUTEC`, jornada 8h com intervalo. |
| RF06 | ADMIN_ORGAO | Associar múltiplos perfis a um usuário. | Art. 19 permite acessos por autoridades, substitutos e delegados. | Usuário possui `SERVIDOR` e `GESTOR`; em outra unidade possui `DELEGADO_GESTOR`. |
| RF07 | GESTOR | Delegar a servidor da unidade a homologação/validação de frequência. | Art. 16, §§1º e 2º. | Diretor de Núcleo delega ao substituto por período de férias. |
| RF08 | SERVIDOR | Consultar frequência diária, marcações, saldo e espelho de ponto. | Art. 19, II. | Servidor visualiza entradas do relógio A, saída via web e retorno facial. |
| RF09 | SERVIDOR / TOTEM / DISPOSITIVO | Registrar ponto por várias origens no mesmo dia, sem limite técnico de marcações. | Arts. 6º, 8º e 18, IV. | Entrada no relógio A; saída intervalo no relógio B; retorno facial; saída final via web. |
| RF10 | NUTEC | Cadastrar relógios, totens, terminais e habilitar compartilhamento entre empresas. | Art. 6º e art. 20, I. | Servidor da JFBA em missão na JFAM registra em relógio habilitado localmente. |
| RF11 | SISTEMA | Preservar ajustes manuais aprovados em nova sincronização dos relógios. | Art. 18, IV permite correção de falha; auditabilidade decorre dos fundamentos da Portaria. | Ajuste manual aprovado substitui uma entrada ausente; nova importação não apaga esse ajuste. |
| RF12 | SERVIDOR / GESTOR | Solicitar e aprovar correção de marcação de entrada/saída. | Art. 18, IV. | Servidor esqueceu registro de retorno do almoço e solicita ajuste com justificativa. |
| RF13 | SISTEMA / GESTOR | Apurar horas previstas, trabalhadas, débito, crédito, não autorizadas e acima do limite. | Art. 2º, art. 8º e art. 10. | Sistema classifica 120 min além da jornada sem autorização como hora não autorizada. |
| RF14 | GESTOR | Autorizar realização e compensação de horas-crédito/débito. | Art. 10, §1º; art. 11; art. 14, §1º. | Gestor aprova compensação de 2h de débito na semana seguinte. |
| RF15 | DIREF | Autorizar banco de horas manual por documento SEI. | Art. 10, §8º e casos omissos/decisão superior. | DIREF autoriza crédito manual de 8h por necessidade formalizada em processo SEI. |
| RF16 | SISTEMA | Aplicar limite de 16h mensais de crédito para fruição futura, salvo exceção justificada. | Art. 14. | Ao alcançar 960 min, novos créditos entram como acima do limite se não houver autorização. |
| RF17 | SISTEMA | Bloquear compensação de horas-débito antes das 6h e após as 19h, salvo exceção autorizada. | Art. 12. | Registro às 05:40 não é usado para compensar débito sem autorização. |
| RF18 | SISTEMA | Impedir compensação de crédito enquanto saldo do banco estiver negativo. | Art. 13, §2º. | Servidor com -3h não pode fruir 1h positiva antes de quitar saldo negativo. |
| RF19 | GESTOR | Homologar frequência mensal até o 2º dia útil e emitir boletim. | Art. 16, §3º. | Gestor homologa espelhos de abril em 04/05, se for 2º dia útil. |
| RF20 | SECAP / NUCGP | Receber boletim até o dia 10 e conferir com SARH. | Art. 17 e art. 20, II. | SECAP recebe boletim do NUTEC, confere faltas e atrasos no SARH. |
| RF21 | DIREF | Autorizar descontos após contraditório e ampla defesa. | Art. 16, §§4º e 5º; art. 20, III. | Após defesa rejeitada, DIREF autoriza desconto de horas não compensadas. |
| RF22 | GESTOR / SERVIDOR | Registrar eventos de capacitação, viagem, atividade externa, teletrabalho, dispensa de ponto, plantão e serviço extraordinário. | Arts. 6º, 7º, 8º, 15 e 18. | Capacitação externa de 4h+ fora da sede conta como jornada integral. |
| RF23 | SISTEMA / GESTOR | Gerar espelho mensal comum e espelhos específicos de recesso para convocados. | Art. 15 e regras de recesso vigentes. | Dezembro: espelho mensal 01–31 com 20–31 como recesso; convocados têm espelho específico 20–31. |
| RF24 | ADMIN_ORGAO / DIREF | Cadastrar período anual de recesso 20/12 a 06/01 e portaria de convocação. | Art. 15. | Recesso 2025/2026 de 20/12/2025 a 06/01/2026; portaria convoca servidores para dias específicos. |
| RF25 | GESTOR / DIREF | Definir, por dia convocado, se trabalho em recesso será pecúnia, folga ou banco. | Regra específica anual de recesso e decisão administrativa. | Dia 23/12 convertido em folga; dia 26/12 pago em pecúnia. |
| RF26 | AUDITOR | Auditar marcações, ajustes, homologações, alternância de perfil e integrações. | Fundamentação de controle diário e auditabilidade. | Auditor vê hash, usuário executor, IP e antes/depois de ajuste. |

---

## 4. Tabela de requisitos não funcionais por perfil/módulo

| Código | Perfil/Módulo | Requisito não funcional | Correlação normativa/técnica | Exemplo real |
|---|---|---|---|---|
| RNF01 | Segurança | Isolamento multitenant por empresa, unidade e perfil. | Uso nacional por vários órgãos. | Usuário da JFAM não acessa dados da JFRR. |
| RNF02 | Segurança | Senhas, bind LDAP, connection string Oracle e tokens devem ser criptografados. | LGPD e segurança institucional. | `connectionStringEncrypted`, nunca texto puro no banco. |
| RNF03 | Auditoria | Log imutável de alterações, com hash encadeado quando possível. | Controle efetivo e sistemático de frequência. | Ajuste manual guarda antes/depois, IP, usuário e hash. |
| RNF04 | Disponibilidade | Registro de ponto deve tolerar falha de AD, relógio ou internet local. | Art. 6º, §1º admite meio alternativo idôneo. | Se relógio falhar, servidor registra via web/facial e gestor valida. |
| RNF05 | Performance | Espelho mensal deve carregar rapidamente mesmo com muitas marcações por dia. | Usabilidade operacional. | Índice por `servidorId` e `registradoEm`. |
| RNF06 | Integridade | Nova sincronização de relógio não deve apagar ajustes manuais aprovados. | Art. 18, IV e preservação de histórico. | Campo `protegidoRessincronizacao = true`. |
| RNF07 | Parametrização | Regras de portaria devem ser dados, não código fixo. | Sistema nacional. | Limite JFAM 16h; outro órgão pode usar 20h via `RegraPortaria`. |
| RNF08 | Rastreabilidade | Espelho deve mostrar origem e método de cada marcação. | Transparência para servidor e gestor. | Origem: `RELOGIO_BIOMETRICO_DIGITAL`; método: `DIGITAL`; dispositivo: `Relógio NUTEC`. |
| RNF09 | Privacidade | Biometria facial deve ser tratada como dado sensível, com embeddings protegidos. | LGPD. | Frontend não recebe embedding após cadastro. |
| RNF10 | Acessibilidade | Interfaces responsivas e acessíveis. | Uso por servidores, gestores e administração. | Espelho consultável em desktop e celular. |
| RNF11 | Observabilidade | Integrações SARH/AFD/dispositivos devem possuir status, contadores e erros. | Governança operacional NUTEC. | Lote SARH informa lidos/criados/atualizados/erros. |
| RNF12 | Evolutividade | DDD/SOLID por módulos: Auth, Pessoas, Frequência, Banco, Workflow, Recesso, Integrações, Auditoria. | Sustentabilidade do produto. | `HourBankService` isolado de `PunchImportService`. |

---

## 5. Sequência lógica de construção incremental

| Ordem | Fase | Funcionalidade | Cadastros auxiliares necessários | Resultado esperado | Exemplo real |
|---:|---|---|---|---|---|
| 1 | Bootstrap | Criar seed inicial `SECP_MASTER`, perfis e permissões base. | `UsuarioSistema`, `PerfilSistema`, `PermissaoSistema`. | Sistema acessível em base vazia. | Login `SECP_MASTER/SECP_MASTER`, troca obrigatória. |
| 2 | Tenant | Cadastro de empresa/órgão. | `Empresa`, `ParametroEmpresa`. | JFAM criada como primeiro tenant. | `slug = jfam`, timezone `America/Manaus`. |
| 3 | Autenticação | Configurar AD/LDAP e fallback. | `EmpresaAuthProvider`, `UnidadeAuthProvider`. | Login exige órgão + usuário + senha. | `srvdc1-am` e `srvdc2-am`. |
| 4 | Organização | Cadastrar unidades hierárquicas. | `UnidadeOrganizacional`, `Cargo`, `FuncaoComissionada`. | Estrutura institucional mínima. | SJAM > NUTEC; SJAM > SECAP; SSJ Tabatinga. |
| 5 | Pessoas | Cadastrar/importar servidores e vincular usuários. | `Servidor`, `LotacaoServidor`, `SarhOracleConfig`. | Servidores disponíveis para ponto. | Importar matrícula, nome, cargo e lotação do SARH. |
| 6 | Perfis | Associar múltiplos perfis e escopos. | `UsuarioPerfil`. | Usuário alterna entre servidor/gestor/admin. | Juarez como `SERVIDOR` e `NUTEC`. |
| 7 | Jornada | Cadastrar jornada padrão e regras DIREF. | `JornadaTrabalho`, `JornadaDia`, `RegraPortaria`, `CalendarioInstitucional`. | Cálculo de jornada possível. | Jornada 7h e 8h; limite 6h–19h; intervalo 1h–3h. |
| 8 | Dispositivos | Cadastrar relógios/totens e compartilhamento. | `DispositivoPonto`, `DispositivoEmpresaHabilitada`. | Equipamentos aptos a registrar/importar. | Relógio da JFAM habilitado para servidor visitante da JFBA. |
| 9 | Marcações V1 | Registrar/importar marcações ilimitadas com origem. | `MarcacaoPonto`, `DispositivoSincronizacao`. | Servidor vê marcações diárias. | Entrada relógio A, retorno facial, saída web. |
| 10 | Espelho V1 | Gerar espelho mensal consultivo. | `EspelhoPonto`, `EspelhoDia`, `EspelhoMarcacao`. | Servidor consulta espelho e origem de registros. | Espelho de maio/2026 com todas as batidas. |
| 11 | Ajustes | Solicitar/aprovar ajuste manual protegido. | `Solicitacao`, `SolicitacaoMarcacao`, `DocumentoSei`. | Ajustes persistem após ressincronização. | Entrada manual aprovada substitui falha do relógio. |
| 12 | Banco de horas | Apurar saldo, limites, prazo e movimentos. | `BancoHorasSaldo`, `BancoHorasMovimento`, `RegraPortaria`. | Crédito/débito classificados conforme portaria. | Limite de 960 min/mês para crédito. |
| 13 | Workflow | Autorizações de crédito, compensação, abono, atividade externa. | `Solicitacao`, `EventoFrequencia`. | Gestor controla compensações. | Compensar 2h de débito autorizadas pelo gestor. |
| 14 | Homologação | Fechamento mensal e boletim de frequência. | `BoletimFrequencia`, `BoletimFrequenciaItem`. | Gestor homologa e envia à SECAP. | Boletim enviado até dia 10. |
| 15 | Recesso | Cadastrar período anual, convocação e espelhos específicos. | `PeriodoRecessoForense`, `ConvocacaoRecesso`, `ConvocacaoRecessoServidor`. | Recesso separado do mensal comum. | Recesso 2025/2026, espelho dezembro e janeiro para convocados. |
| 16 | DIREF | Banco manual e decisões formais com documento SEI. | `DocumentoSei`, `BancoHorasMovimento`. | Crédito manual excepcional rastreado. | DIREF autoriza crédito manual de 8h no SEI. |
| 17 | Integrações | SARH, AFD, APIs e observabilidade. | `SarhImportacaoLote`, `AfdArquivoImportado`, `AfdLinhaImportada`. | Dados legados sincronizados. | Importar estrutura funcional do Oracle/SARH. |
| 18 | Biometria | Cadastro facial e totem. | `BiometriaFacial`, `DispositivoPonto`. | Ponto facial com auditoria. | Totem reconhece servidor e gera marcação. |
| 19 | Auditoria | Logs imutáveis e trilha de decisões. | `AuditLog`. | Rastreabilidade institucional. | Alternância de perfil e ajustes auditados. |

---

## 6. Dicionário resumido dos models com exemplos

| Grupo | Models | Finalidade | Exemplo de dados |
|---|---|---|---|
| Autenticação | `UsuarioSistema`, `PerfilSistema`, `UsuarioPerfil`, `SessaoAuth`, `EmpresaAuthProvider` | Login, perfis múltiplos, alternância de perfil, AD/LDAP e bootstrap. | `UsuarioSistema.username = SECP_MASTER`; `UsuarioPerfil.perfilCodigo = NUTEC`; `EmpresaAuthProvider.host = srvdc1-am.trf1.jus.br`. |
| Tenant | `Empresa`, `ParametroEmpresa`, `UnidadeOrganizacional` | Isolar cada órgão e estruturar unidades de forma flexível. | `Empresa.sigla = JFAM`; unidade `NUTEC`; pai `SJAM`. |
| Pessoas | `Servidor`, `Cargo`, `FuncaoComissionada`, `LotacaoServidor`, `DelegacaoGestor` | Representar servidores, cargos, funções, lotações e delegações. | Servidor matrícula `AM12345`, cargo `Técnico Judiciário`, lotação `NUTEC`. |
| Regras | `RegraPortaria`, `CalendarioInstitucional`, `CalendarioDia` | Parametrizar portarias, feriados, pontos facultativos e limites. | `LIMITE_CREDITO_MENSAL_MINUTOS = 960`; fundamento `art. 14`. |
| Jornada | `JornadaTrabalho`, `JornadaDia`, `ServidorJornada`, `EscalaServidor` | Definir jornada 7h/8h, horários diferenciados e escalas. | Jornada 8h com intervalo mínimo 60 min e máximo 180 min. |
| Dispositivos | `DispositivoPonto`, `DispositivoEmpresaHabilitada`, `DispositivoSincronizacao` | Relógios, totens, compartilhamento entre órgãos e sync. | Relógio `REP-NUTEC-01`, compartilhável, habilitado para JFBA. |
| Marcações | `MarcacaoPonto`, `EventoFrequencia`, `Solicitacao`, `SolicitacaoMarcacao` | Registrar batidas ilimitadas, eventos e ajustes protegidos. | Marcação via relógio A às 07:58; ajuste manual às 12:01 protegido. |
| Espelho | `EspelhoPonto`, `EspelhoDia`, `EspelhoMarcacao`, `BoletimFrequencia` | Apurar, exibir, homologar e enviar frequência. | Espelho `MENSAL` maio/2026; espelho `RECESSO_DEZEMBRO`. |
| Banco de horas | `BancoHorasSaldo`, `BancoHorasMovimento` | Controlar saldo positivo/negativo, manual DIREF, compensação e desconto. | Movimento `CREDITO_MANUAL_DIREF`, 480 min, documento SEI anexado. |
| Recesso | `PeriodoRecessoForense`, `ConvocacaoRecesso`, `ConvocacaoRecessoServidor` | Recesso 20/12 a 06/01, convocados, pecúnia/folga/banco. | Servidor convocado em 23/12 com destinação `FOLGA`. |
| Biometria | `BiometriaFacial` | Armazenar embedding facial protegido. | Modelo `human-face-v1`, qualidade `0.9821`, ativo. |
| Integrações | `SarhOracleConfig`, `SarhImportacaoLote`, `AfdArquivoImportado` | Integração SARH/Oracle e importação AFD. | Lote SARH atualizou 320 servidores e 12 lotações. |
| Auditoria | `AuditLog` | Trilha de auditoria por empresa, usuário, ação e entidade. | Ação `AJUSTE_PONTO_APROVADO`, antes/depois e hash. |

---

## 7. Exemplos práticos de preenchimento de regras da JFAM

```json
[
  {
    "codigo": "LIMITE_CREDITO_MENSAL_MINUTOS",
    "valor": { "minutos": 960 },
    "fundamentoNormativo": "Portaria SJAM-DIREF 135/2025, art. 14"
  },
  {
    "codigo": "PRAZO_COMPENSACAO_MESES",
    "valor": { "meses": 3 },
    "fundamentoNormativo": "Portaria SJAM-DIREF 135/2025, art. 10, §2º"
  },
  {
    "codigo": "HORARIO_MINIMO_COMPENSACAO",
    "valor": { "hora": "06:00" },
    "fundamentoNormativo": "Portaria SJAM-DIREF 135/2025, art. 12"
  },
  {
    "codigo": "HORARIO_MAXIMO_COMPENSACAO",
    "valor": { "hora": "19:00" },
    "fundamentoNormativo": "Portaria SJAM-DIREF 135/2025, art. 12"
  },
  {
    "codigo": "INTERVALO_MINIMO_MINUTOS",
    "valor": { "minutos": 60 },
    "fundamentoNormativo": "Portaria SJAM-DIREF 135/2025, art. 4º, §6º"
  },
  {
    "codigo": "INTERVALO_MAXIMO_MINUTOS",
    "valor": { "minutos": 180 },
    "fundamentoNormativo": "Portaria SJAM-DIREF 135/2025, art. 4º, §6º"
  },
  {
    "codigo": "PRAZO_DEFESA_DIAS_UTEIS",
    "valor": { "diasUteis": 2 },
    "fundamentoNormativo": "Portaria SJAM-DIREF 135/2025, art. 16, §4º"
  },
  {
    "codigo": "PRAZO_ENVIO_BOLETIM_DIA_MES",
    "valor": { "dia": 10, "proximoDiaUtilSeNaoUtil": true },
    "fundamentoNormativo": "Portaria SJAM-DIREF 135/2025, art. 17"
  },
  {
    "codigo": "RECESSO_FORENSE_PADRAO",
    "valor": { "inicio": "20/12", "fim": "06/01", "geraEspelhoEspecificoConvocados": true },
    "fundamentoNormativo": "Portaria SJAM-DIREF 135/2025, art. 15 e regra anual vigente"
  }
]
```

---

## 8. Regra de espelho do recesso forense

### Servidor não convocado

- Espelho mensal de dezembro: período 01/12 a 31/12.
- Dias 20/12 a 31/12 aparecem como `RECESSO_FORENSE`, sem exigência de marcação ordinária.
- Espelho mensal de janeiro: período 01/01 a 31/01.
- Dias 01/01 a 06/01 aparecem como `RECESSO_FORENSE`.

### Servidor convocado

- Mantém espelho mensal comum, mas os dias de convocação ficam vinculados ao recesso.
- Gera espelho específico `RECESSO_DEZEMBRO` para 20/12 a 31/12, quando houver convocação em dezembro.
- Gera espelho específico `RECESSO_JANEIRO` para 01/01 a 06/01, quando houver convocação em janeiro.
- Cada dia convocado informa `destinacao`: `FOLGA`, `PECUNIA` ou `BANCO_HORAS`.
- As marcações do recesso devem ser registradas normalmente, preferencialmente por biometria/equipamento, e vinculadas ao espelho de recesso.

---

## 9. Regra de preservação de ajuste manual

A tabela `MarcacaoPonto` nunca deve apagar marcações importadas nem ajustes manuais. A rotina correta é:

1. Importação do relógio cria marcações com `origem = RELOGIO_BIOMETRICO_DIGITAL` ou `IMPORTACAO_AFD`.
2. Ajuste aprovado cria nova marcação com `origem = AJUSTE_MANUAL_GESTOR` ou `AJUSTE_MANUAL_ADMIN`.
3. Ajuste manual aprovado recebe `protegidoRessincronizacao = true` e `prioridadeCalculo` maior.
4. Se o ajuste substitui uma marcação, preenche `substituiMarcacaoId`, mas não apaga a marcação original.
5. Nova sincronização deduplica pelo `externalId` do relógio, mas não altera registros protegidos.
6. O espelho materializa em `EspelhoMarcacao` quais registros foram considerados no cálculo.

---

## 10. V1 mínima recomendada

A primeira versão operacional deve conter apenas o necessário para o servidor visualizar marcações e espelho:

1. Bootstrap `SECP_MASTER`.
2. Empresa/órgão.
3. AD/LDAP da empresa.
4. Unidades básicas.
5. Cargos/funções básicos ou importação SARH.
6. Servidores e usuários vinculados.
7. Perfis `ADMIN_ORGAO`, `NUTEC`, `GESTOR`, `SERVIDOR`.
8. Jornadas padrão 7h e 8h.
9. Regras DIREF mínimas em `RegraPortaria`.
10. Relógio/dispositivo.
11. Registro/importação de marcações.
12. Espelho consultivo mensal, com origem de cada marcação.

Depois entram ajustes, banco de horas, homologação, recesso, boletim, SARH completo, totem facial e auditoria avançada.
