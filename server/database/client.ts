const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_SSL_CA } =
  process.env;

import mysql from "mysql2/promise";

const client = mysql.createPool({
  host: DB_HOST,
  port: Number.parseInt(DB_PORT as string),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  // En production (TiDB Cloud) : connexion chiffrée obligatoire, vérifiée avec le certificat DB_SSL_CA.
  // En local : DB_SSL_CA est vide, la connexion reste comme avant.
  ssl: DB_SSL_CA ? { ca: DB_SSL_CA, rejectUnauthorized: true } : undefined,
});

export default client;

import type { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";

type DatabaseClient = Pool;
type Result = ResultSetHeader;
type Rows = RowDataPacket[];

export type { DatabaseClient, Result, Rows };
