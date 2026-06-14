import pkg from "pg";
import 'dotenv/config'
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export const connectToDatabase = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");

    console.log("Database connection Successfully");
    console.log(result.rows[0].now);
    //  returns a manually checked-out database connection back into the connection pool so it can be reused by other queries
    client.release();
  } catch (error) {
    console.log("Database connection failed");
    console.error(error.message || error)
    process.exit(1)
  }
};


export default pool;
