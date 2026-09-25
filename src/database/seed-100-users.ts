import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
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

const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Võ', 'Phan', 'Vũ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý'];
const middleNames = ['Văn', 'Thị', 'Đình', 'Quang', 'Hải', 'Thành', 'Minh', 'Ngọc', 'Đức', 'Anh', 'Hoàng', 'Thanh', 'Phương', 'Tấn', 'Hữu'];
const lastNames = ['Nam', 'Hùng', 'Sơn', 'Tuấn', 'Tùng', 'Long', 'Hiếu', 'Duy', 'Phong', 'Ánh', 'Dũng', 'Hà', 'Thiên', 'Kiệt', 'Vân', 'Bắc', 'Việt', 'Lan', 'Mai', 'Linh', 'Thảo', 'Trang', 'Phúc', 'Lâm'];

const aquaticSuffixes = [
  'Aqua', 'Betta', 'Guppy', 'Koi', 'Discus', 'Biotop', 'Shrimp', 'Iwagumi', 'Dutch', 'Plant', 'Tetra', 'RedCherry', 'Ranchu', 'Channa', 'AquaDesign', 'WaterLife', 'Aquascape', 'TankMaster'
];

const avatarList = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300',
  'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=300',
  'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=300',
  'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=300',
  'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=300',
  'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=300',
];

function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

export async function seed100Users(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);

  console.log('🔑 Hashing default password (123456)...');
  const passwordHash = await bcrypt.hash('123456', 10);

  console.log('🌱 Creating 100 realistic aquatic enthusiast user accounts...');
  let createdCount = 0;
  let skippedCount = 0;

  for (let i = 1; i <= 100; i++) {
    const fn = firstNames[i % firstNames.length];
    const mn = middleNames[(i * 3) % middleNames.length];
    const ln = lastNames[(i * 7) % lastNames.length];
    const suffix = aquaticSuffixes[i % aquaticSuffixes.length];
    
    const fullName = `${fn} ${mn} ${ln}`;
    const rawUsername = `${removeAccents(fn).toLowerCase()}_${removeAccents(ln).toLowerCase()}_${suffix.toLowerCase()}_${i}`;
    const displayName = `${fullName} - ${suffix}`;
    const avatar = avatarList[i % avatarList.length];

    let user = await userRepo.findOne({ where: { username: rawUsername } });
    if (!user) {
      await userRepo.save(
        userRepo.create({
          username: rawUsername,
          email: `user${i}_${removeAccents(ln).toLowerCase()}@aquahub.vn`,
          password: passwordHash,
          displayName: displayName,
          avatar: avatar,
          role: i === 1 ? Role.ADMIN : Role.USER,
          bio: `Thành viên đam mê cá cảnh & thủy sinh #${i} tại AquaHub Việt Nam.`,
        }),
      );
      createdCount++;
    } else {
      skippedCount++;
    }
  }

  const totalUsers = await userRepo.count();
  console.log(`✅ Seed finished! Added ${createdCount} new users (Total in Database: ${totalUsers} users).`);
}

async function run() {
  console.log('🔌 Connecting to PostgreSQL database...');
  await AppDataSource.initialize();
  console.log('✅ Database connected!');

  await seed100Users(AppDataSource);

  await AppDataSource.destroy();
}

if (require.main === module) {
  run().catch((err) => {
    console.error('❌ Error during seeding 100 users:', err);
    process.exit(1);
  });
}
