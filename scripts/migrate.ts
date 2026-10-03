import { neon } from '@neondatabase/serverless';
import { readdir, readFile } from 'node:fs/promises';

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL is required');
const sql = neon(url);

const dir = new URL('../db/', import.meta.url);
for (const file of (await readdir(dir)).filter((f) => f.endsWith('.sql')).sort()) {
  const statements = (await readFile(new URL(file, dir), 'utf8'))
    .split(/;\s*$/m)
    .map((s) => s.trim())
    .filter(Boolean);
  for (const statement of statements) await sql.query(statement);
  console.log(`applied ${file}`);
}
