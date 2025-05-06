import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config(); 
const connectionString = process.env.POSTGRESS_CONNECTION_STRING;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, 
  },
});

async function testConnection(): Promise<void> {
  const client = await pool.connect(); 
  try {
    const res = await client.query('SELECT NOW()'); 
    console.log('Connected to the database successfully:', res.rows[0]);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    client.release(); 
  }
}

export { pool, testConnection };
