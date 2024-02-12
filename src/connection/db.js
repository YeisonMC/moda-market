import { createPool } from "mysql2/promise";
import {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
} from "../config.js";

export const poolConection = createPool({
  // host: "localhost",
  // port: 3306,
  // database: "modamarket",
  // user: "root",
  // password: "12345",

  host: DB_HOST,
  port: DB_PORT,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
});
