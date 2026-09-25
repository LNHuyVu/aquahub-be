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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/([^0-9a-z-\s])/g, '')
    .replace(/(\s+)/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const TOPICS = [
  { topic: 'Cá Betta', tags: ['Betta', 'Chữa bệnh', 'Chăm sóc'] },
  { topic: 'Cá Guppy (Bảy màu)', tags: ['Guppy', 'Sinh sản', 'Thức ăn'] },
  { topic: 'Cá Koi', tags: ['Koi', 'Hồ ngoài trời', 'Lọc hồ'] },
  { topic: 'Cá Vàng (Goldfish)', tags: ['Cá vàng', 'Thay nước', 'Nhiệt độ'] },
  { topic: 'Cá Rồng (Arowana)', tags: ['Cá rồng', 'Phong thủy', 'Tăng màu'] },
  { topic: 'Cá Đĩa (Discus)', tags: ['Cá đĩa', 'Nước mềm', 'pH'] },
  { topic: 'Tép cảnh', tags: ['Tép cảnh', 'Khoáng chất', 'Thủy sinh'] },
  { topic: 'Cây Thủy Sinh', tags: ['Cây thủy sinh', 'CO2', 'Phân nền'] },
  { topic: 'Hệ Thống Lọc & Vi Sinh', tags: ['Lọc vi sinh', 'Cycle bể', 'Khử Clo'] },
  { topic: 'Bệnh Cá & Xử Lý', tags: ['Bệnh nấm', 'Trị nấm', 'Muối hột'] },
];

const QUESTION_TEMPLATES = [
  {
    title: 'Cách xử lý cá {species} bị {disease} hiệu quả tại nhà?',
    content: '<p>Chào mọi người, bể mình nuôi {species} dạo này xuất hiện triệu chứng {disease}. Cá lờ đờ bỏ ăn và bơi sát mặt nước. Mọi người cho mình hỏi dùng thuốc gì và liều lượng muối hột ra sao để cá mau khỏi ạ?</p>',
    answers: [
      '<p>Bạn nên cách ly cá bệnh ra bể riêng. Tăng nhiệt độ lên 28-29°C và cắm sưởi. Thêm muối hột liều 1g/lít nước và thay 20% nước mỗi ngày kết hợp nhỏ dưỡng cá nhé!</p>',
      '<p>Kinh nghiệm của mình là kiểm tra lại thông số nước trước. Clo quá cao hoặc vi sinh chưa ổn định cũng làm cá lờ đờ. Bạn nhớ dùng chất khử clo mỗi khi thay nước nhé!</p>'
    ]
  },
  {
    title: 'Bể {size}L nên nuôi bao nhiêu con cá {species} là phù hợp nhất?',
    content: '<p>Em mới set bể kích thước {size} lit. Em muốn nuôi cá {species} thì số lượng bao nhiêu con là hợp lý để không bị quá tải hệ thống lọc ạ?</p>',
    answers: [
      '<p>Đối với bể {size}L, bạn nên thả tầm {count} con cá {species} để đảm bảo lượng oxy và tải vi sinh hoạt động ổn định nhất nhé.</p>',
      '<p>Nếu lọc tốt (có vật liệu lọc matrix hoặc sứ lọc) thì thả thêm 20% cũng được, nhưng tốt nhất vẫn nên thả vừa phải để cá có không gian bơi bơi tự do.</p>'
    ]
  },
  {
    title: 'Thông số pH và nhiệt độ chuẩn nhất để nuôi cá {species} sinh sản?',
    content: '<p>Cho em hỏi thông số pH và nhiệt độ lý tưởng để cá {species} phát triển khỏe mạnh và dễ sinh sản là bao nhiêu ạ? Em đang dùng nước máy đã qua xử lý.</p>',
    answers: [
      '<p>Dòng {species} ưa nước pH từ {phMin} đến {phMax}, nhiệt độ dao động 24-28°C. Bạn chú ý duy trì nhiệt độ ổn định bằng sưởi vào mùa lạnh nhé.</p>',
      '<p>Bổ sung thêm lá bàng khô hoặc khoáng chất để điều hòa độ pH nhẹ nhàng cho cá rất tốt đó bạn!</p>'
    ]
  },
  {
    title: 'Nên dùng loại thức ăn nào cho cá {species} mau lớn và lên màu đẹp?',
    content: '<p>Mọi người tư vấn giúp em loại cám hoặc thức ăn tươi sống nào giúp cá {species} khỏe mạnh, nhanh lớn và trổ màu rực rỡ nhất với ạ?</p>',
    answers: [
      '<p>Bạn nên kết hợp cám hạt chìm giàu đạm với trùn chỉ hoặc artemia ấp nở 2-3 lần/tuần. Đảm bảo cá sẽ cực kỳ sung và trổ màu đẹp!</p>',
      '<p>Nên cho ăn liều lượng vừa đủ trong 3-5 phút, tránh cho ăn quá nhiều dư thừa gây đục nước và bùng phát rêu hại.</p>'
    ]
  },
  {
    title: 'Làm sao để xử lý nước bể nuôi cá {species} bị đục và có mùi hôi?',
    content: '<p>Bể nuôi cá {species} của em mấy hôm nay nước bị mờ đục như nước vo gạo và có mùi hôi nhẹ. Em đã thay 30% nước nhưng hôm sau lại bị. Nhờ mọi người hướng dẫn cách khắc phục triệt để!</p>',
    answers: [
      '<p>Đây là hiện tượng vi sinh bị sụp hoặc bể mới chưa châm đủ vi sinh quang hợp. Bạn không nên thay nước quá nhiều, hãy châm vi sinh tươi và bật lọc liên tục 24/7 nhé.</p>',
      '<p>Bổ sung thêm bông lọc mịn và giảm bớt lượng thức ăn thừa trong vài ngày, nước sẽ tự trong vắt lại sau 48h.</p>'
    ]
  },
  {
    title: 'Cá {species} có nuôi chung được với tép cảnh và cây thủy sinh không?',
    content: '<p>Em định làm bể thủy sinh trồng rêu và thả tép cảnh, muốn nuôi thêm vài chú cá {species} cho sinh động. Không biết cá có rỉa tép con hoặc cắn nát cây không ạ?</p>',
    answers: [
      '<p>Cá {species} tính cách tương đối hiền lành, tuy nhiên với tép con mới nở thì cá vẫn có thể rỉa. Bạn nên trồng nhiều rêu và ngóc ngách cho tép trốn nhé!</p>',
      '<p>Cây thủy sinh thì hoàn toàn an toàn, chúng không ăn cây đâu nên bạn yên tâm set bể thủy sinh đẹp mắt nhé.</p>'
    ]
  },
  {
    title: 'Kinh nghiệm chọn mua cá {species} khỏe mạnh không bị nhiễm bệnh?',
    content: '<p>Em chuẩn bị ra cửa hàng mua cá {species}. Mọi người chia sẻ giúp em một số dấu hiệu nhận biết cá khỏe mạnh, sung sức và không mang mầm bệnh với ạ!</p>',
    answers: [
      '<p>Chọn những con bơi lội linh hoạt, vây cờ xòe rộng, thân hình đầy đặn không bị hóp bụng hay tróc vảy. Tránh mua con bơi tách đàn hoặc nằm góc bể.</p>',
      '<p>Quan sát mắt cá phải trong, không bị mờ đục và không có chấm trắng lạ trên vây/thân là OK nha bạn.</p>'
    ]
  },
  {
    title: 'Hệ thống lọc loại nào tốt nhất cho bể nuôi cá {species}?',
    content: '<p>Em đang dùng bể 50cm nuôi cá {species}, phân phân ra khá nhiều. Em nên đầu tư lọc thác, lọc treo hay lọc thùng để nước luôn sạch đẹp ạ?</p>',
    answers: [
      '<p>Lọc thùng (Canister filter) kết hợp vật liệu lọc matrix/sứ xoắn là lựa chọn số 1. Dòng chảy êm ái mà chứa được nhiều vật liệu lọc vi sinh nhất!</p>',
      '<p>Nếu ngân sách vừa phải thì lọc treo cỡ lớn có ngăn lọc phụ cũng rất ngon bổ rẻ cho bể 50cm rồi bạn.</p>'
    ]
  },
  {
    title: 'Cách ươm và chăm sóc cá {species} con mới nở tỷ lệ sống cao?',
    content: '<p>Cá {species} nhà em vừa đẻ được một lứa cá con. Em đã tách riêng ra thau nhựa nhưng chưa biết cho ăn gì và chăm sóc làm sao để cá con không bị hao hụt?</p>',
    answers: [
      '<p>2 ngày đầu cá con sống bằng túi noãn hoàng nên chưa cần cho ăn. Từ ngày thứ 3 cho ăn artemia ấp nở hoặc lòng đỏ trứng gà sấy khô dạng bột cực mịn nhé.</p>',
      '<p>Chú ý hút cặn nhẹ nhàng mỗi ngày và thay 10% nước sạch đã sục khí clo để tránh gây sốc nước cho cá con.</p>'
    ]
  },
  {
    title: 'Tần suất thay nước cho bể cá {species} bao nhiêu lần một tuần là chuẩn?',
    content: '<p>Mọi người cho em hỏi đối với bể nuôi cá {species} thì nên thay nước 1 tuần mấy lần và mỗi lần thay bao nhiêu % là tốt nhất cho cá ạ?</p>',
    answers: [
      '<p>Thường 1 tuần thay 1-2 lần, mỗi lần khoảng 20-30% thể tích bể là chuẩn nhất. Không nên thay 100% nước vì sẽ làm mất hệ vi sinh và gây sốc pH.</p>',
      '<p>Nhớ dùng dung dịch khử clo hoặc phơi nước máy trước 24h trước khi châm vào bể nhé bạn!</p>'
    ]
  }
];

const SPECIES_LIST = [
  { name: 'Betta Halfmoon', disease: 'thối vây', size: 15, count: 1, phMin: 6.5, phMax: 7.5 },
  { name: 'Guppy Full Red', disease: 'túm vây', size: 30, count: 12, phMin: 6.8, phMax: 7.6 },
  { name: 'Cá Koi F1', disease: 'nấm trắng', size: 1000, count: 5, phMin: 7.0, phMax: 8.0 },
  { name: 'Cá Vàng Ranchu', disease: 'nấm mang', size: 80, count: 4, phMin: 7.0, phMax: 7.8 },
  { name: 'Cá Rồng Huyết Long', disease: 'xù vảy', size: 500, count: 1, phMin: 6.5, phMax: 7.2 },
  { name: 'Cá Đĩa Red Melon', disease: 'phân trắng', size: 120, count: 6, phMin: 6.0, phMax: 6.8 },
  { name: 'Tép Red Cherry', disease: 'hở cổ', size: 20, count: 30, phMin: 6.2, phMax: 7.2 },
  { name: 'Cá Neon Xanh', disease: 'nấm thân', size: 40, count: 20, phMin: 6.0, phMax: 7.0 },
  { name: 'Cá Phượng Hoàng', disease: 'mờ mắt', size: 50, count: 4, phMin: 6.5, phMax: 7.2 },
  { name: 'Cá Sặc Gấm', disease: 'lở loét', size: 60, count: 6, phMin: 6.5, phMax: 7.5 },
];

export async function seed100Questions(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const questionRepo = dataSource.getRepository(Question);
  const answerRepo = dataSource.getRepository(Answer);

  console.log('🌱 Finding users for questions & answers authors...');
  let users = await userRepo.find({ take: 10 });
  if (users.length === 0) {
    const admin = await userRepo.save(
      userRepo.create({
        username: 'aquahub_expert',
        email: 'expert@aquahub.vn',
        password: '$2b$10$Wq3vXN8u1b9qZ8kY5qZ9uO.9h7tY6u5v4w3x2y1z0a1b2c3d4e5f6',
        displayName: 'Chuyên Gia Thủy Sinh',
        role: Role.ADMIN,
      }),
    );
    users = [admin];
  }

  console.log('🚀 Generating 100 realistic Q&A entries...');
  let createdCount = 0;

  for (let i = 1; i <= 100; i++) {
    const template = QUESTION_TEMPLATES[(i - 1) % QUESTION_TEMPLATES.length];
    const speciesInfo = SPECIES_LIST[(i - 1) % SPECIES_LIST.length];
    const topicInfo = TOPICS[(i - 1) % TOPICS.length];

    const title = template.title
      .replace(/{species}/g, speciesInfo.name)
      .replace(/{disease}/g, speciesInfo.disease)
      .replace(/{size}/g, speciesInfo.size.toString());

    const rawSlug = slugify(title) + `-${i}`;

    const content = template.content
      .replace(/{species}/g, speciesInfo.name)
      .replace(/{disease}/g, speciesInfo.disease)
      .replace(/{size}/g, speciesInfo.size.toString());

    const author = users[(i - 1) % users.length];

    // Check if question exists
    let existing = await questionRepo.findOne({ where: { slug: rawSlug } });
    if (!existing) {
      const isSolved = i % 2 === 0;
      const question = await questionRepo.save(
        questionRepo.create({
          title,
          slug: rawSlug,
          content,
          authorId: author.id,
          tags: topicInfo.tags,
          images: i % 3 === 0 ? ['https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800'] : [],
          viewsCount: Math.floor(Math.random() * 300) + 20,
          answersCount: template.answers.length,
          isSolved,
          createdAt: new Date(Date.now() - i * 3600000 * 3), // staggered dates
        }),
      );

      // Add Answers
      let bestAnswerId: string | null = null;
      for (let j = 0; j < template.answers.length; j++) {
        const ansContent = template.answers[j]
          .replace(/{species}/g, speciesInfo.name)
          .replace(/{size}/g, speciesInfo.size.toString())
          .replace(/{count}/g, speciesInfo.count.toString())
          .replace(/{phMin}/g, speciesInfo.phMin.toString())
          .replace(/{phMax}/g, speciesInfo.phMax.toString());

        const ansAuthor = users[(i + j + 1) % users.length];
        const isBest = isSolved && j === 0;

        const savedAns = await answerRepo.save(
          answerRepo.create({
            content: ansContent,
            questionId: question.id,
            authorId: ansAuthor.id,
            likesCount: Math.floor(Math.random() * 15) + 1,
            isBestAnswer: isBest,
            createdAt: new Date(question.createdAt.getTime() + (j + 1) * 1800000),
          }),
        );

        if (isBest) {
          bestAnswerId = savedAns.id;
        }
      }

      if (bestAnswerId) {
        question.bestAnswerId = bestAnswerId;
        await questionRepo.save(question);
      }

      createdCount++;
    }
  }

  console.log(`✅ Successfully seeded ${createdCount} Questions and Answers!`);
}

async function run() {
  console.log('🔌 Connecting to PostgreSQL database...');
  await AppDataSource.initialize();
  console.log('✅ Database connected!');

  await seed100Questions(AppDataSource);

  console.log('🎉 100 Questions seed completed successfully!');
  await AppDataSource.destroy();
}

if (require.main === module) {
  run().catch((err) => {
    console.error('❌ Error during seeding 100 questions:', err);
    process.exit(1);
  });
}
