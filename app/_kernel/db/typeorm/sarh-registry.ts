import "server-only";
import { DataSource } from "typeorm";
import { SarhServidor } from "./sarh-entities";

type Uf = string;

declare global {
  // eslint-disable-next-line no-var
  var __sarhRegistry: Map<string, DataSource> | undefined;
}

const registry = global.__sarhRegistry ?? new Map<string, DataSource>();
if (process.env.NODE_ENV !== "production") global.__sarhRegistry = registry;

function buildSarhDataSource(uf: Uf) {
  const driver = process.env.SARH_DRIVER || "oracle";

  if (driver === "sqlite") {
    return new DataSource({
      type: "sqlite",
      database: process.env.SARH_SQLITE_PATH || "./data/sarh-sim.db",
      entities: [SarhServidor],
      synchronize: false,
      logging: false,
    });
  }

  // ORACLE: parâmetros por UF (um set por estado)
  // Ex.: ORACLE_AM_HOST, ORACLE_RR_HOST...
  const host = process.env[`ORACLE_${uf}_HOST`];
  const port = Number(process.env[`ORACLE_${uf}_PORT`] || 1521);
  const username = process.env[`ORACLE_${uf}_USER`];
  const password = process.env[`ORACLE_${uf}_PASSWORD`];
  const sid = process.env[`ORACLE_${uf}_SID`];

  if (!host || !username || !password || !sid) {
    throw new Error(`Config SARH Oracle incompleta para UF=${uf}`);
  }

  return new DataSource({
    type: "oracle",
    host,
    port,
    username,
    password,
    sid,
    entities: [SarhServidor],
    synchronize: false,
    logging: false,
  });
}

export async function getSarhDataSource(uf: Uf) {
  if (!registry.has(uf)) {
    registry.set(uf, buildSarhDataSource(uf));
  }

  const ds = registry.get(uf)!;
  if (!ds.isInitialized) await ds.initialize();
  return ds;
}
