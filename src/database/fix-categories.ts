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

  console.log('🔍 Checking categories in DB...');
  const catsRes = await client.query('SELECT id, name, slug FROM fish_categories ORDER BY "order" ASC');
  console.log('Categories:', catsRes.rows);

  const ocCat = catsRes.rows.find((c: any) => c.slug === 'oc-canh');
  const cayCat = catsRes.rows.find((c: any) => c.slug === 'cay-thuy-sinh');
  const oldCat = catsRes.rows.find((c: any) => c.slug === 'oc-thuy-sinh');

  if (ocCat) {
    const updateOc = await client.query('UPDATE fish SET "categoryId" = $1 WHERE slug LIKE \'oc-%\'', [ocCat.id]);
    console.log(`Updated ${updateOc.rowCount} snail items to category oc-canh`);
  }

  if (cayCat) {
    const updateCay = await client.query(
      'UPDATE fish SET "categoryId" = $1 WHERE slug LIKE \'cay-%\' OR slug LIKE \'co-%\' OR slug LIKE \'duong-%\' OR slug LIKE \'reu-%\' OR slug LIKE \'tran-%\' OR slug LIKE \'ruc-%\' OR slug LIKE \'tieu-%\' OR slug LIKE \'tan-%\'',
      [cayCat.id]
    );
    console.log(`Updated ${updateCay.rowCount} plant items to category cay-thuy-sinh`);
  }

  if (oldCat) {
    const remaining = await client.query('SELECT COUNT(*) FROM fish WHERE "categoryId" = $1', [oldCat.id]);
    console.log(`Remaining items in old category oc-thuy-sinh: ${remaining.rows[0].count}`);
    if (Number(remaining.rows[0].count) === 0) {
      await client.query('DELETE FROM fish_categories WHERE id = $1', [oldCat.id]);
      console.log('Deleted obsolete category oc-thuy-sinh!');
    }
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
