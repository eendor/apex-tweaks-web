import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'node:fs';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is missing');
const sql = neon(process.env.DATABASE_URL);
const source = readFileSync(new URL('../database/schema.sql', import.meta.url), 'utf8');
for (const statement of source.split(';').map(value => value.trim()).filter(Boolean)) {
  await sql.query(statement);
}
const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`;
console.log(`Database ready: ${tables.map(row => row.table_name).join(', ')}`);
