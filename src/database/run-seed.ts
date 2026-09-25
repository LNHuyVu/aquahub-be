import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env
dotenv.config({ path: path.join(__dirname, '../../.env') });

import { User } from '../modules/users/entities/user.entity';
import { Fish, FishCategory } from '../modules/fish/entities/fish.entity';
import { Post, PostCategory, Comment, Like, Bookmark, Report } from '../modules/posts/entities/post.entity';
import { Question, Answer } from '../modules/questions/entities/question.entity';
import { Tank, TankFish, TankLog } from '../modules/tanks/entities/tank.entity';
import { Article } from '../modules/articles/entities/article.entity';
import { ArticleCategory } from '../modules/articles/entities/article-category.entity';
import { Ad } from '../modules/ads/entities/ad.entity';
import { Setting } from '../modules/settings/entities/setting.entity';
import {
  Listing,
  ListingCategory,
  ListingComment,
  ListingLike,
  ListingReport,
} from '../modules/listings/entities/listing.entity';
import { TrafficLog } from '../modules/traffic/entities/traffic-log.entity';

import { seedFishDatabase } from './seed';
import { seed20UsersWithPosts } from './seed-20-users';
import { seed20Listings } from './seed-listings';
import { seed50Questions } from './seed-questions';

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
    PostCategory,
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
    ArticleCategory,
    Ad,
    Setting,
    Listing,
    ListingCategory,
    ListingComment,
    ListingLike,
    ListingReport,
    TrafficLog,
  ],
  synchronize: true,
});

async function run() {
  console.log('🔌 Connecting to PostgreSQL database...');
  await AppDataSource.initialize();
  console.log('✅ Database connected!');

  console.log('--- Phase 1: Seeding 1000 Fish & Articles ---');
  await seedFishDatabase(AppDataSource);

  console.log('--- Phase 2: Seeding Users, Posts & Comments ---');
  await seed20UsersWithPosts(AppDataSource);

  console.log('--- Phase 3: Seeding Marketplace Listings ---');
  await seed20Listings(AppDataSource);

  console.log('--- Phase 4: Seeding Q&A Questions & Answers ---');
  await seed50Questions(AppDataSource);

  console.log('🎉 MASTER SEED COMPLETED SUCCESSFULLY!');
  await AppDataSource.destroy();
}

run().catch((err) => {
  console.error('❌ Error during master seeding:', err);
  process.exit(1);
});
