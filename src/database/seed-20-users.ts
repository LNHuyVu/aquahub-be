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

const userConfigs = [
  { username: 'nguyen_nam_aqua', displayName: 'Nguyễn Nam - Đam Mê Thủy Sinh', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' },
  { username: 'tran_minh_betta', displayName: 'Trần Minh (Betta Shop)', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' },
  { username: 'le_anh_guppy', displayName: 'Lê Anh - Guppy Trại Hà Nội', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300' },
  { username: 'pham_hoang_koi', displayName: 'Phạm Hoàng - Koi Garden', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300' },
  { username: 'vo_thu_thuy', displayName: 'Võ Thu Thủy - Hồ Kính Mini', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300' },
  { username: 'dang_hai_long', displayName: 'Đặng Hải Long - Đĩa Đỏ SG', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300' },
  { username: 'hoang_van_hieu', displayName: 'Hoàng Văn Hiếu - Bể Biotop', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300' },
  { username: 'bui_quang_duy', displayName: 'Bùi Quang Duy (Vật Tư Bể)', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300' },
  { username: 'do_thanh_tuan', displayName: 'Đỗ Thanh Tuấn - Tép Cảnh Hà Đông', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300' },
  { username: 'nguyen_khieu_phong', displayName: 'Nguyễn Khiếu Phong - Rồng Đỏ', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300' },
  { username: 'phan_dinh_tung', displayName: 'Phan Đình Tùng - Thủy Sinh Việt', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300' },
  { username: 'truong_ngoc_anh', displayName: 'Trương Ngọc Ánh - Ranchu Club', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300' },
  { username: 'vu_tien_dung', displayName: 'Vũ Tiến Dũng - Vi Sinh Extra', avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=300' },
  { username: 'dinh_nguyen_ha', displayName: 'Đinh Nguyên Hà - Cây Cảnh Nước', avatar: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=300' },
  { username: 'cao_van_thien', displayName: 'Cao Văn Thiên - Ali Châu Phi', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=300' },
  { username: 'mai_thanh_son', displayName: 'Mai Thanh Sơn - Thiết Bị Bể', avatar: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=300' },
  { username: 'ha_duy_kiet', displayName: 'Hà Duy Kiệt - Đèn LED Thủy Sinh', avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=300' },
  { username: 'lam_mong_van', displayName: 'Lâm Mộng Vân - Betta Dumbo', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' },
  { username: 'ngo_van_bac', displayName: 'Ngô Văn Bắc - Bể Sân Thượng', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' },
  { username: 'trinh_quoc_viet', displayName: 'Trịnh Quốc Việt - Thủy Sinh SG', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300' },
];

const postTemplates = [
  {
    category: '🐟 Cá cảnh',
    content: 'Em mới cập bến bầy cá Neon Vua (Cardinal) bơi đàn rực rỡ dưới ánh đèn RGB. Anh em cho hỏi độ pH 6.8 nuôi dòng này lâu dài có phát triển tốt không ạ?',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800',
    comments: [
      'Neon Vua nuôi pH 6.5 - 7.0 là chuẩn bài luôn bác ơi, cho ăn artemia tươi là cá lên dải đỏ căng đét!',
      'Cho hỏi bể bác kích thước bao nhiêu mà cá bơi đàn nhìn mê quá vậy?',
      'Bể 60cm bác ơi, thả 30 em bơi nhịp nhàng lắm!',
      'Màu đỏ đậm đẹp quá, mua ở trại nào thế bác chỉ em với!',
    ],
  },
  {
    category: '🌱 Thủy sinh',
    content: 'Chia sẻ với anh em thành quả bố cục Iwagumi sau 3 tuần gieo mầm thảm Trân Châu Ngọc Bảo. Cây bắt đầu đẻ bò nhả bọt oxy lấp lánh rồi!',
    image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800',
    comments: [
      'Quá đẹp bác ơi! Bác dùng đèn RGB hiệu gì và châm CO2 mấy giọt/giây thế?',
      'Em chạy đèn Week Aqua 60W kết hợp CO2 3 giọt/giây bác ạ.',
      'Cỏ bò đều mượt quá, có bị dính rêu hại gì không bác?',
      'Có ít rêu tóc rìa đá nhưng em thả 5 em tép Amano dọn sạch bách sau 2 ngày.',
    ],
  },
  {
    category: '💧 Nước & Vi sinh',
    content: 'Cảnh báo anh em mùa mưa clo trong nước máy tăng cao! Hôm qua mình chủ quan thay 40% nước không khử Clo làm cả bầy Guppy bị sốc may mà cấp cứu sủi oxy kịp!',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    comments: [
      'Cảm ơn bác đã cảnh báo, mùa mưa nhà đài châm Clo mạnh lắm nên trữ xô trước 24h cho chắc.',
      'Em toàn châm chai dung dịch khử Clo cấp tốc trước 5 phút rồi mới thay, an toàn tuyệt đối!',
      'May mà bác sủi oxy mạnh cứu kịp bầy cá mẩy!',
    ],
  },
  {
    category: '🦠 Bệnh & Chăm sóc',
    content: 'Em cá Betta Halfmoon bị cúp vây nhẹ nghi do chuyển lạnh đột ngột. Em đã cắm sưởi 30 độ và châm chút muối hột, liệu sau mấy ngày thì xòe vây trở lại ạ?',
    image: 'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=800',
    comments: [
      'Cách làm của bác đúng chuẩn rồi, tầm 2-3 ngày là em nó sung xòe vây lại ngay thôi!',
      'Cho em nó ăn tí trùng huyết tươi dưỡng sức là mau hồi phục lắm.',
      'Tránh lùa luồng nước mạnh quá nha bác, Betta vây dài thích nước yên tĩnh.',
    ],
  },
  {
    category: '🍤 Thức ăn',
    content: 'Tự ấp Artemia tươi tại nhà cho cá bột ăn vừa tiết kiệm lại giúp cá phổng phao nhanh gấp đôi ăn cám hạt. Có bác nào cùng sở thích ấp artemia không?',
    image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800',
    comments: [
      'Em ấp bằng hũ nhựa sủi bọt 24h là nở bạt ngàn, cá con vừa nở ăn vào bụng đỏ chót!',
      'Ấp artemia sinh khối hay vặt vỏ thế bác?',
      'Em ấp loại vặt vỏ ấp nở 95% cực tiện bác ơi.',
    ],
  },
  {
    category: '🧰 Thiết bị',
    content: 'Mới nâng cấp từ lọc thác lên lọc thùng Matrix chứa được 3 lít sứ lọc nham thạch. Nước bể trong vắt như không khí, đúng là tiền nào của nấy!',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800',
    comments: [
      'Lọc thùng là chân lý rồi bác, chứa được nhiều vật liệu lọc vi sinh khỏe vắt nước!',
      'Lọc thùng bác chạy dòng gì vậy, có ồn không bác?',
      'Em chạy lọc Atman DF1300 siêu êm không nghe tiếng động gì luôn bác.',
    ],
  },
  {
    category: '🐣 Sinh sản',
    content: 'Bầy cá Ranchu nhà em hôm nay vừa xả trứng ngập xơ dừa! Đã tách cá bố mẹ ra thau riêng. Xin kinh nghiệm chăm cá bột 3 ngày đầu mới nở với ạ!',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
    comments: [
      'Chúc mừng bác! 3 ngày đầu cá bột còn lòng đỏ trứng chưa cần cho ăn đâu bác.',
      'Sang ngày thứ 4 bắt đầu cho ăn lòng đỏ trứng gà luộc chín hòa nước hoặc artemia tươi nhé.',
      'Sủi oxy nhẹ nhàng thôi tránh cá bột bị cuốn theo luồng nhé bác.',
    ],
  },
  {
    category: '🦐 Tép & Sinh vật',
    content: 'Bầy tép Neocaridina đỏ rực (Red Cherry) của em đẻ sai quá tràn ngập cả bụi rêu Java. Thả thêm vài em ốc Nerita dọn rêu bám kính nhìn hồ mê ly luôn!',
    image: 'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=800',
    comments: [
      'Tép đỏ mượt quá bác ơi, có châm khoáng GH+ định kỳ không bác?',
      'Có bác ơi, em châm Liquid GH+ nâng độ cứng cho tép lột vỏ cứng cáp.',
      'Nhìn thảm rêu xanh tép đỏ tương phản đẹp tuyệt vời!',
    ],
  },
  {
    category: '💰 Mua bán',
    content: 'Giao lưu bầy cá Guppy Full Gold vây tai bướm thuần chủng cực đẹp tại Hà Nội. Anh em nào quan tâm Inbox em chia lại giá sinh viên nhé!',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800',
    comments: [
      'Bố mẹ vây to xòe rộng đẹp quá bác, cho xin giá 2 cặp vào inbox nhé!',
      'Có ship tỉnh xa qua xe khách không bác ơi?',
      'Có ship COD toàn quốc bọc oxy an toàn nhé bác!',
    ],
  },
];

export async function seed20UsersWithPosts(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const postRepo = dataSource.getRepository(Post);
  const commentRepo = dataSource.getRepository(Comment);

  console.log('🔑 Hashing default password (123456)...');
  const passwordHash = await bcrypt.hash('123456', 10);

  console.log('🌱 Creating 20 user accounts...');
  const createdUsers: User[] = [];

  for (const u of userConfigs) {
    let user = await userRepo.findOne({ where: { username: u.username } });
    if (!user) {
      user = await userRepo.save(
        userRepo.create({
          username: u.username,
          email: `${u.username}@gmail.com`,
          password: passwordHash,
          displayName: u.displayName,
          avatar: u.avatar,
          role: Role.USER,
          bio: 'Thành viên đam mê cá cảnh & thủy sinh AquaHub Việt Nam.',
        }),
      );
    }
    createdUsers.push(user);
  }

  console.log(`✅ ${createdUsers.length} user accounts created/ready!`);

  console.log('🚀 Creating community posts & cross-commenting...');
  let postCount = 0;
  let commentCount = 0;

  for (let i = 0; i < postTemplates.length; i++) {
    const template = postTemplates[i];
    const author = createdUsers[i % createdUsers.length];

    const post = await postRepo.save(
      postRepo.create({
        content: template.content,
        images: [template.image],
        category: template.category,
        authorId: author.id,
        likesCount: Math.floor(Math.random() * 45) + 5,
        commentsCount: template.comments.length,
        isPublished: true,
      }),
    );
    postCount++;

    // Add comments from other users
    let parentComment: Comment | null = null;
    for (let cIdx = 0; cIdx < template.comments.length; cIdx++) {
      const commentText = template.comments[cIdx];
      const commentAuthor = createdUsers[(i + cIdx + 1) % createdUsers.length];

      const newComment = await commentRepo.save(
        commentRepo.create({
          content: commentText,
          postId: post.id,
          authorId: commentAuthor.id,
          parentId: cIdx > 0 && cIdx % 2 === 1 && parentComment ? parentComment.id : undefined,
        }),
      );
      commentCount++;

      if (cIdx === 0) parentComment = newComment;
    }
  }

  console.log(`🎉 Created ${postCount} community posts & ${commentCount} interactive comments!`);
}

async function run() {
  console.log('🔌 Connecting to PostgreSQL database...');
  await AppDataSource.initialize();
  console.log('✅ Database connected!');

  await seed20UsersWithPosts(AppDataSource);

  console.log('🎉 20 User accounts & community discussions seeded successfully!');
  await AppDataSource.destroy();
}

if (require.main === module) {
  run().catch((err) => {
    console.error('❌ Error during seeding 20 users & posts:', err);
    process.exit(1);
  });
}
