import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

import { User } from '../modules/users/entities/user.entity';
import { Role } from '../common/enums/role.enum';
import { Post, Comment, Like } from '../modules/posts/entities/post.entity';
import { Fish, FishCategory } from '../modules/fish/entities/fish.entity';
import { Question, Answer } from '../modules/questions/entities/question.entity';
import { Tank, TankFish, TankLog } from '../modules/tanks/entities/tank.entity';
import { Article } from '../modules/articles/entities/article.entity';
import { Ad } from '../modules/ads/entities/ad.entity';

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

export async function markSystemManagedUsers(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  
  console.log('🏷️ Updating users to set isSystemManaged = true for auto-generated bot users...');
  
  const result = await userRepo
    .createQueryBuilder()
    .update(User)
    .set({ isSystemManaged: true })
    .where("username LIKE :pattern OR email LIKE :emailPattern", { 
      pattern: '%_%_%_%', 
      emailPattern: 'user%@aquahub.vn' 
    })
    .execute();

  console.log(`✅ Updated ${result.affected || 0} user accounts with isSystemManaged = true.`);
}

async function run() {
  console.log('🔌 Connecting to PostgreSQL database...');
  await AppDataSource.initialize();
  console.log('✅ Database connected!');

  await markSystemManagedUsers(AppDataSource);

  await AppDataSource.destroy();
}

if (require.main === module) {
  run().catch((err) => {
    console.error('❌ Error during updating system managed users:', err);
    process.exit(1);
  });
}
