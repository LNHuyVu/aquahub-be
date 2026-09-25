import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

import { User } from '../modules/users/entities/user.entity';
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

const categories = ['🐟 Cá cảnh', '🌱 Thủy sinh', '💧 Nước & Vi sinh', '🦠 Bệnh & Chăm sóc', '🍤 Thức ăn', '🧰 Thiết bị', '🐣 Sinh sản', '🦐 Tép & Sinh vật', '💰 Mua bán'];

const postTitleTemplates = [
  'Chia sẻ bầy cá {species} vừa về hồ, màu sắc lên cực kỳ rực rỡ dưới ánh đèn RGB!',
  'Bố cục bể {style} sau 4 tuần lên cây mướt mát, mời anh em cho ý kiến đóng góp.',
  'Kinh nghiệm xử lý rêu tóc & rêu chùm đen trong hồ thủy sinh cực đơn giản mà hiệu quả.',
  'Cảnh báo anh em thời tiết chuyển mùa, cắm sưởi giữ nhiệt độ 28-30°C tránh nấm trắng!',
  'Tự làm thức ăn giàu đạm cho cá cảnh giúp lên màu căng đẹp mà nước không bị đục.',
  'Review chi tiết lọc thùng và vật liệu lọc Matrix sau 6 tháng sử dụng liên tục.',
  'Nhật ký ép đẻ thành công bầy cá {species}, cá con nở đông như kiến!',
  'Thảm cây Trân Châu Ngọc Trai bò phủ kín nền sau 20 ngày gieo hạt, bí quyết là đây!',
  'Hồ tép cảnh Neocaridina đẻ sai quá, chia bớt cho anh em đam mê giá sinh viên.',
  'Có nên dùng vi sinh quang hợp PSB định kỳ cho bể cá cảnh? Đánh giá thực tế.',
];

const speciesList = ['Neon Vua', 'Guppy Full Gold', 'Betta Halfmoon', 'Cá Đĩa Heckel', 'Ranchu Ngũ Sắc', 'Cá Rồng Huyết Long', 'Cá Sọc Ngựa Dạ Quang', 'Tép Red Cherry', 'Cá Chuột Panda', 'Cá Ali Châu Phi'];
const styleList = ['Iwagumi Thạch Cảnh', 'Hà Lan Dutch Style', 'Biotope Amazon', 'Jungle Rừng Rậm', 'Bể Cây Bán Cạn Paludarium'];

const imagePool = [
  'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800',
  'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
  'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=800',
  'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
  'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=800',
];

const commentPool = [
  'Bài viết rất hữu ích và tâm huyết, cảm ơn bác đã chia sẻ kinh nghiệm!',
  'Bố cục bể nhìn mê quá bác ơi, cho em xin thông số đèn và CO2 với ạ!',
  'Cá đẹp và khỏe mạnh quá, nuôi bằng cám gì thế bác?',
  'Chuẩn bài luôn bác! Em cũng đang áp dụng cách này và thấy nước trong vắt.',
  'Cho em hỏi dòng cá này có dễ nuôi chung với tép cảnh không bác?',
  'Bể nhìn mướt mắt quá, chúc mừng bác sở hữu tác phẩm xuất sắc!',
  'Bác ở khu vực nào thế, có chia lại con giống hoặc cây thủy sinh không ạ?',
  'Thông tin rất chuẩn, thời tiết này không cắm sưởi là cá dễ nấm ngay.',
  'Cảm ơn bác, nhờ bài viết này mà em biết cách xử lý rêu hại thành công.',
  'Tuyệt vời! Tiếp tục phát huy và chia sẻ thêm nhiều bài viết hay nhé bác!',
];

export async function seed100PostsWithComments(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const postRepo = dataSource.getRepository(Post);
  const commentRepo = dataSource.getRepository(Comment);

  const users = await userRepo.find();
  if (users.length === 0) {
    console.error('❌ No users found in database! Please run seed-100-users first.');
    return;
  }

  console.log(`🌱 Seeding 100 community posts with active comments across ${users.length} users...`);

  let createdPostsCount = 0;
  let createdCommentsCount = 0;

  for (let i = 1; i <= 100; i++) {
    const author = users[i % users.length];
    const category = categories[i % categories.length];
    const species = speciesList[i % speciesList.length];
    const style = styleList[i % styleList.length];

    let contentTemplate = postTitleTemplates[i % postTitleTemplates.length];
    contentTemplate = contentTemplate.replace('{species}', species).replace('{style}', style);

    const postEntity = postRepo.create({
      content: contentTemplate,
      images: [imagePool[i % imagePool.length]],
      authorId: author.id,
      likesCount: Math.floor(Math.random() * 80) + 10,
      commentsCount: 0,
      isPublished: true,
    });
    const post = await postRepo.save(postEntity);
    createdPostsCount++;

    // Add 2 - 5 comments from other users for each post
    const commentNum = (i % 4) + 2;
    for (let c = 0; c < commentNum; c++) {
      const commenter = users[(i + c * 7 + 3) % users.length];
      const commentText = commentPool[(i + c) % commentPool.length];

      await commentRepo.save(
        commentRepo.create({
          content: commentText,
          postId: post.id,
          authorId: commenter.id,
        }),
      );
      createdCommentsCount++;
    }

    // Update post comment count
    post.commentsCount = commentNum;
    await postRepo.save(post);
  }

  const totalPosts = await postRepo.count();
  const totalComments = await commentRepo.count();
  console.log(`✅ Seed finished! Added ${createdPostsCount} new posts and ${createdCommentsCount} comments.`);
  console.log(`📊 Total in Database: ${totalPosts} Posts & ${totalComments} Comments.`);
}

async function run() {
  console.log('🔌 Connecting to PostgreSQL database...');
  await AppDataSource.initialize();
  console.log('✅ Database connected!');

  await seed100PostsWithComments(AppDataSource);

  await AppDataSource.destroy();
}

if (require.main === module) {
  run().catch((err) => {
    console.error('❌ Error during seeding 100 posts with comments:', err);
    process.exit(1);
  });
}
