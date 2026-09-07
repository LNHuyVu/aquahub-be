import { Client } from 'pg';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function main() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgre369',
    database: process.env.DB_DATABASE || 'aquahub',
  });
  await client.connect();
  const hash = await bcrypt.hash('123456', 10);
  await client.query('UPDATE users SET password = $1 WHERE username IN ($2, $3)', [hash, 'admin', 'aquaman']);
  const res = await client.query('SELECT username, email, role FROM users WHERE username IN (\'admin\', \'aquaman\')');
  console.log('✅ Accounts updated in DB:', res.rows);
  await client.end();
}

main().catch(console.error);
