import { DataSource } from 'typeorm';
import { Fish, FishCategory, DifficultyLevel, SwimLevel } from '../modules/fish/entities/fish.entity';
import { generate1000Fish } from './generate-1000-fish';
import { seedArticlesDatabase } from './seed-articles';

export async function seedFishDatabase(dataSource: DataSource) {
  const categoryRepo = dataSource.getRepository(FishCategory);
  const fishRepo = dataSource.getRepository(Fish);

  console.log('🌱 Seeding fish categories...');

  const categoriesData = [
    { name: 'Cá nước ngọt', slug: 'ca-nuoc-nghot', description: 'Các loài cá sinh sống trong môi trường nước ngọt', order: 1 },
    { name: 'Cá thủy sinh', slug: 'ca-thuy-sinh', description: 'Các loài cá kích thước nhỏ, hiền lành thích hợp nuôi hồ thủy sinh', order: 2 },
    { name: 'Cá Betta', slug: 'ca-betta', description: 'Cá chọi Betta với bộ vây rực rỡ và tính cách độc lập', order: 3 },
    { name: 'Cá Guppy (Bảy màu)', slug: 'ca-guppy', description: 'Dòng cá đẻ con phổ biến, màu sắc phong phú', order: 4 },
    { name: 'Cá Koi & Cá Vàng', slug: 'ca-koi-ca-vang', description: 'Các loài cá cảnh phong thủy hồ ngoài trời và bể kính', order: 5 },
    { name: 'Cá biển', slug: 'ca-bien', description: 'Các loài cá nước mặn nhiệt đới đầy màu sắc', order: 6 },
    { name: 'Tép cảnh', slug: 'tep-canh', description: 'Các loại tép màu, tép Sulawesi và tép Ong', order: 7 },
    { name: 'Ốc cảnh', slug: 'oc-canh', description: 'Các loại ốc diệt rêu hại và làm sạch môi trường hồ', order: 8 },
    { name: 'Cây thủy sinh', slug: 'cay-thuy-sinh', description: 'Các loại cây thủy sinh, rêu và thực vật trang trí', order: 9 },
  ];

  const categoriesMap: Record<string, FishCategory> = {};

  for (const catData of categoriesData) {
    let cat = await categoryRepo.findOne({ where: [{ slug: catData.slug }, { name: catData.name }] });
    if (!cat) {
      cat = await categoryRepo.save(categoryRepo.create(catData));
    }
    categoriesMap[catData.slug] = cat;
  }

  console.log('🌱 Generating 1000 freshwater & saltwater fish data...');
  const fishListRaw = generate1000Fish();

  const fishListToSave = fishListRaw.map((f) => ({
    nameVi: f.nameVi,
    nameEn: f.nameEn,
    scientificName: f.scientificName,
    slug: f.slug,
    categoryId: categoriesMap[f.categorySlug]?.id || categoriesMap['ca-nuoc-nghot'].id,
    images: f.images,
    sizeMin: f.sizeMin,
    sizeMax: f.sizeMax,
    lifespan: f.lifespan,
    difficulty: f.difficulty as DifficultyLevel,
    tempMin: f.tempMin,
    tempMax: f.tempMax,
    phMin: f.phMin,
    phMax: f.phMax,
    minTankSize: f.minTankSize,
    swimLevel: f.swimLevel as SwimLevel,
    temperament: f.temperament,
    diet: f.diet,
    compatibleFish: f.compatibleFish,
    incompatibleFish: f.incompatibleFish,
    commonDiseases: f.commonDiseases,
    description: f.description,
  }));

  console.log(`🚀 Inserting ${fishListToSave.length} fish species into PostgreSQL in chunks...`);
  
  // Chunk insert to avoid memory/query overflow
  const chunkSize = 100;
  for (let i = 0; i < fishListToSave.length; i += chunkSize) {
    const chunk = fishListToSave.slice(i, i + chunkSize);
    for (const f of chunk) {
      const existing = await fishRepo.findOne({ where: { slug: f.slug } });
      if (!existing) {
        await fishRepo.save(fishRepo.create(f));
      }
    }
    console.log(`   └ Saved ${Math.min(i + chunkSize, fishListToSave.length)} / ${fishListToSave.length} species...`);
  }

  console.log('✅ 1000 Fish database seeded successfully!');

  // Seed 50 handbook articles
  await seedArticlesDatabase(dataSource);
}

export { seedArticlesDatabase };

