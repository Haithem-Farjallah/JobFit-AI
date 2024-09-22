import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "job_applications_db",
  password: "hello3100",
  port: 5432,
  connectionTimeoutMillis: 5000, // if a client is idle for 5 seconds, the connection is closed
});
export default pool;
