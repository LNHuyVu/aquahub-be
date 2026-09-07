import { Client } from 'pg';
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

  const oldCat = (await client.query('SELECT id FROM fish_categories WHERE slug = \'oc-thuy-sinh\'')).rows[0];
  const defaultCat = (await client.query('SELECT id FROM fish_categories WHERE slug = \'oc-canh\'')).rows[0];

  if (oldCat && defaultCat) {
    // Re-assign remaining old items to oc-canh
    await client.query('UPDATE fish SET "categoryId" = $1 WHERE "categoryId" = $2', [defaultCat.id, oldCat.id]);
    await client.query('DELETE FROM fish_categories WHERE id = $1', [oldCat.id]);
    console.log('✅ Cleaned up obsolete category oc-thuy-sinh!');
  }

  const finalCounts = await client.query(`
    SELECT c.name, c.slug, COUNT(f.id) as count
    FROM fish_categories c
    LEFT JOIN fish f ON f."categoryId" = c.id
    GROUP BY c.id, c.name, c.slug
    ORDER BY c."order" ASC
  `);
  console.log('\n📊 FINAL FISH COUNTS PER CATEGORY:');
  console.table(finalCounts.rows);

  await client.end();
}

main().catch(console.error);
