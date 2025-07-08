import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_sQ0WFJGNfwl5@ep-odd-credit-admoirvs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

if (!global.pgPool) {
    global.pgPool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
}
const pool = global.pgPool;

export default pool;