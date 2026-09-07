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
  console.log('Generated hash:', hash);

  // Clear existing admin / aquaman
  await client.query('DELETE FROM users WHERE username IN (\'admin\', \'aquaman\')');

  // Insert fresh admin and aquaman
  await client.query(
    `INSERT INTO users (id, username, email, password, "displayName", role, "isActive", "createdAt", "updatedAt")
     VALUES 
       ('a1111111-1111-1111-1111-111111111111', 'admin', 'admin@aquahub.vn', $1, 'Quản trị viên AquaHub', 'ADMIN', true, NOW(), NOW()),
       ('a2222222-2222-2222-2222-222222222222', 'aquaman', 'aquaman@gmail.com', $1, 'Minh Thủy Sinh', 'USER', true, NOW(), NOW())`,
    [hash]
  );

  const res = await client.query('SELECT id, username, email, role, "isActive" FROM users');
  console.log('✅ RE-CREATED USERS IN DATABASE:');
  console.table(res.rows);

  await client.end();
}

main().catch(console.error);
