import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env
dotenv.config({ path: path.join(__dirname, '../../.env') });

import { User } from '../modules/users/entities/user.entity';
import { Role } from '../common/enums/role.enum';
import { Fish, FishCategory } from '../modules/fish/entities/fish.entity';
import { Post, Comment, Like, Bookmark, Report } from '../modules/posts/entities/post.entity';
import { Question, Answer } from '../modules/questions/entities/question.entity';
import { Tank, TankFish, TankLog } from '../modules/tanks/entities/tank.entity';
import { Article } from '../modules/articles/entities/article.entity';
import { Ad } from '../modules/ads/entities/ad.entity';
import { generate50Articles } from './generate-50-articles';

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

export async function seedArticlesDatabase(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const articleRepo = dataSource.getRepository(Article);

  console.log('🌱 Finding or creating admin author...');
  let admin = await userRepo.findOne({ where: { role: Role.ADMIN } });
  if (!admin) {
    admin = await userRepo.findOne({ where: {} });
  }
  if (!admin) {
    admin = await userRepo.save(
      userRepo.create({
        username: 'admin',
        email: 'admin@aquahub.vn',
        password: '$2b$10$Wq3vXN8u1b9qZ8kY5qZ9uO.9h7tY6u5v4w3x2y1z0a1b2c3d4e5f6', // dummy bcrypt
        displayName: 'Chuyên gia AquaHub',
        role: Role.ADMIN,
      }),
    );
  }

  console.log('🌱 Generating 200 fish care handbook articles...');
  const articlesRaw = generate50Articles();

  console.log(`🚀 Upserting ${articlesRaw.length} handbook articles into PostgreSQL...`);
  let insertedCount = 0;
  let updatedCount = 0;

  for (const art of articlesRaw) {
    let existing = await articleRepo.findOne({ where: { slug: art.slug } });
    if (existing) {
      existing.title = art.title;
      existing.excerpt = art.excerpt;
      existing.content = art.content;
      existing.coverImage = art.coverImage;
      existing.tags = art.tags;
      await articleRepo.save(existing);
      updatedCount++;
    } else {
      await articleRepo.save(
        articleRepo.create({
          title: art.title,
          slug: art.slug,
          excerpt: art.excerpt,
          content: art.content,
          coverImage: art.coverImage,
          authorId: admin.id,
          tags: art.tags,
          viewsCount: art.viewsCount,
          isPublished: true,
          publishedAt: new Date(),
        }),
      );
      insertedCount++;
    }
  }

  console.log(`✅ ${insertedCount} new articles inserted, ${updatedCount} articles updated in database!`);
}

async function run() {
  console.log('🔌 Connecting to PostgreSQL database...');
  await AppDataSource.initialize();
  console.log('✅ Database connected!');

  await seedArticlesDatabase(AppDataSource);

  console.log('🎉 50 Handbook Articles seed completed successfully!');
  await AppDataSource.destroy();
}

if (require.main === module) {
  run().catch((err) => {
    console.error('❌ Error during seeding 50 articles:', err);
    process.exit(1);
  });
}
