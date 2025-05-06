import {Pool} from 'pg';

const connectionString = 'postgresql://neondb_owner:npg_KjZPF2cmtsh7@ep-wild-firefly-a4g7i2mf-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false, 
    },
  });

  async function testConnection() {
    try{
        const client = await pool.connect();
        await client.query('SELECT NOW()');
        console.log('Connected to the database successfully!');
        client.release();
    }catch(error){
        console.error('Error connecting to the database:', error);
    }
  }

testConnection();
