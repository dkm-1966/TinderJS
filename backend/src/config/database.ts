import { Pool } from "pg";

const database = new Pool({
  user: "postgres",
  password: "root",
  port: 5432,
  host: "localhost",
  database: "tinder",
});

export default database;