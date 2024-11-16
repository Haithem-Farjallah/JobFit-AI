import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "job_applications_db",
  password: "hello3100",
  port: 5432,
});
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});
export default pool;
