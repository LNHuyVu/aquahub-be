import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env
dotenv.config({ path: path.join(__dirname, '../../.env') });

import { User } from '../modules/users/entities/user.entity';
import { Fish, FishCategory } from '../modules/fish/entities/fish.entity';
import { Post, Comment, Like, Bookmark, Report } from '../modules/posts/entities/post.entity';
import { Question, Answer } from '../modules/questions/entities/question.entity';
import { Tank, TankFish, TankLog } from '../modules/tanks/entities/tank.entity';
import { Article } from '../modules/articles/entities/article.entity';
import { Ad } from '../modules/ads/entities/ad.entity';
import { generate500RealFish } from './generate-500-real-fish';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgre369',
  database: process.env.DB_DATABASE || 'aquahub',
  entities: [
    User,
    Fish,
    FishCategory,
    Post,
    Comment,
    Like,
    Bookmark,
    Report,
    Question,
    Answer,
    Tank,
    TankFish,
    TankLog,
    Article,
    Ad,
  ],
  synchronize: true,
});

export async function seed500FishDatabase(dataSource: DataSource) {
  const fishRepo = dataSource.getRepository(Fish);
  const categoryRepo = dataSource.getRepository(FishCategory);

  console.log('🌱 Checking or creating fish categories...');
  const categoriesData = [
    { name: 'Cá thủy sinh', slug: 'ca-thuy-sinh', description: 'Các loài cá kích thước nhỏ, hiền lành thích hợp nuôi hồ thủy sinh', order: 1 },
    { name: 'Cá Betta', slug: 'ca-betta', description: 'Cá chọi Betta với bộ vây rực rỡ và tính cách độc lập', order: 2 },
    { name: 'Cá Guppy (Bảy màu)', slug: 'ca-guppy', description: 'Dòng cá đẻ con phổ biến, màu sắc phong phú', order: 3 },
    { name: 'Cá Koi & Cá Vàng', slug: 'ca-koi-ca-vang', description: 'Các loài cá cảnh phong thủy hồ ngoài trời và bể kính', order: 4 },
    { name: 'Cá nước ngọt', slug: 'ca-nuoc-nghot', description: 'Các loài cá sinh sống trong môi trường nước ngọt thiên nhiên', order: 5 },
    { name: 'Cá cảnh biển', slug: 'ca-bien', description: 'Các loài cá nước mặn nhiệt đới rực rỡ từ rạn san hô', order: 6 },
    { name: 'Tép cảnh', slug: 'tep-canh', description: 'Các loại tép màu, tép Sulawesi và tép Ong', order: 7 },
    { name: 'Ốc thủy sinh', slug: 'oc-thuy-sinh', description: 'Ốc dọn rêu kính và sinh vật đáy hữu ích', order: 8 },
  ];

  const categoriesMap: Record<string, FishCategory> = {};
  for (const catData of categoriesData) {
    let cat = await categoryRepo.findOne({ where: { slug: catData.slug } });
    if (!cat) {
      cat = await categoryRepo.save(categoryRepo.create(catData));
    }
    categoriesMap[catData.slug] = cat;
  }

  console.log('🌱 Generating dataset of 500 real aquarium fish species...');
  const fishDataList = generate500RealFish();

  console.log(`🚀 Upserting ${fishDataList.length} fish species into PostgreSQL database...`);
  let inserted = 0;
  let updated = 0;

  for (const f of fishDataList) {
    const category = categoriesMap[f.categorySlug] || categoriesMap['ca-thuy-sinh'];
    
    let existing = await fishRepo.findOne({
      where: [{ slug: f.slug }, { scientificName: f.scientificName }],
    });

    if (existing) {
      existing.nameVi = f.nameVi;
      existing.nameEn = f.nameEn;
      existing.scientificName = f.scientificName;
      existing.categoryId = category.id;
      existing.images = f.images;
      existing.sizeMin = f.sizeMin;
      existing.sizeMax = f.sizeMax;
      existing.lifespan = f.lifespan;
      existing.difficulty = f.difficulty as any;
      existing.tempMin = f.tempMin;
      existing.tempMax = f.tempMax;
      existing.phMin = f.phMin;
      existing.phMax = f.phMax;
      existing.minTankSize = f.minTankSize;
      existing.swimLevel = f.swimLevel as any;
      existing.temperament = f.temperament;
      existing.diet = f.diet;
      existing.compatibleFish = f.compatibleFish;
      existing.incompatibleFish = f.incompatibleFish;
      existing.commonDiseases = f.commonDiseases;
      existing.description = f.description;
      await fishRepo.save(existing);
      updated++;
    } else {
      const newFish = fishRepo.create({
        nameVi: f.nameVi,
        nameEn: f.nameEn,
        scientificName: f.scientificName,
        slug: f.slug,
        categoryId: category.id,
        images: f.images,
        sizeMin: f.sizeMin,
        sizeMax: f.sizeMax,
        lifespan: f.lifespan,
        difficulty: f.difficulty as any,
        tempMin: f.tempMin,
        tempMax: f.tempMax,
        phMin: f.phMin,
        phMax: f.phMax,
        minTankSize: f.minTankSize,
        swimLevel: f.swimLevel as any,
        temperament: f.temperament,
        diet: f.diet,
        compatibleFish: f.compatibleFish,
        incompatibleFish: f.incompatibleFish,
        commonDiseases: f.commonDiseases,
        description: f.description,
        isPublished: true,
      });
      await fishRepo.save(newFish);
      inserted++;
    }
  }

  console.log(`✅ Success: ${inserted} new fish inserted, ${updated} fish updated in PostgreSQL!`);
}

async function run() {
  console.log('🔌 Connecting to PostgreSQL database...');
  await AppDataSource.initialize();
  console.log('✅ Database connected!');

  await seed500FishDatabase(AppDataSource);

  console.log('🎉 500 Aquarium Fish Species Seeding completed successfully!');
  await AppDataSource.destroy();
}

if (require.main === module) {
  run().catch((err) => {
    console.error('❌ Error during 500 fish seeding:', err);
    process.exit(1);
  });
}
