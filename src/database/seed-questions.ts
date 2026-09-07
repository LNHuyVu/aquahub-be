import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

import { User } from '../modules/users/entities/user.entity';
import { Role } from '../common/enums/role.enum';
import { Question, Answer } from '../modules/questions/entities/question.entity';
import { Fish, FishCategory } from '../modules/fish/entities/fish.entity';
import { Post, Comment, Like, Bookmark, Report } from '../modules/posts/entities/post.entity';
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

const faqList = [
  {
    title: 'Tại sao bể cá mới setup nước cứ bị vẩn đục trắng như nước vôi?',
    content: 'Em mới mua bể 40cm, chít phân nền và cắm lọc chạy được 2 ngày mà nước cứ đục mù trắng xóa như đục sữa. Cho em hỏi nguyên nhân và cách xử lý nhanh với ạ?',
    answer: 'Hiện tượng này gọi là bùng nổ vi sinh (Bacterial Bloom). Do bể mới chưa thiết lập xong chu trình vi sinh, vi khuẩn tự do sinh sôi rầm rộ làm đục nước. Cách xử lý: không thay nước dồn dập, bật lọc & sủi oxy 24/7, châm thêm men vi sinh chất lượng (như ExtraBio/Biozym) và kiên nhẫn sau 3-5 ngày nước sẽ tự trong vắt trở lại.',
    tags: ['Xử lý nước', 'Vi sinh', 'Bể mới'],
    isSolved: true,
  },
  {
    title: 'Cá Guppy 7 màu bị túm vây, lắc thân bơi lờ đờ trên mặt nước chữa thế nào?',
    content: 'Bầy cá Guppy nhà em hôm nay có vài con bị cúp vây lưng vây đuôi lại, người lắc lắc không bơi được xa. Nhờ các cao thủ chỉ giúp em cách cứu với!',
    answer: 'Cá bị túm vây lắc thân thường do sốc nước, nước bẩn tích tụ NH3/NO2 hoặc nhiễm nấm nhẹ màng da. Cách chữa: 1) Sưởi ấm bể lên 29-30°C. 2) Cắm châm muối hột liều lượng 2g/lít nước. 3) Thay 30% nước sạch đã khử clo. 4) Nhỏ thêm Tetra Nhật hoặc Bio Knock 2 liều lượng hướng dẫn. Sau 2 ngày cá sẽ xòe vây trở lại.',
    tags: ['Cá Guppy', 'Trị bệnh cá', 'Túm vây'],
    isSolved: true,
  },
  {
    title: 'Nhiệt độ môi trường chuẩn nhất cho bể cá cảnh và hồ thủy sinh là bao nhiêu?',
    content: 'Mùa hè thì nước nóng 31 độ, mùa đông xuống 18 độ. Cho em hỏi ngưỡng nhiệt độ mát mẻ an toàn nhất cho hầu hết cá cảnh là mấy độ ạ?',
    answer: 'Nhiệt độ lý tưởng nhất cho hầu hết các dòng cá cảnh nhiệt đới và cây thủy sinh là từ 24°C - 28°C. Mùa hè nên dùng quạt làm mát giảm nhiệt, mùa đông nên cắm cây sưởi tự động ngắt ở 26°C-27°C để tránh cá bị sốc nhiệt và nấm vây.',
    tags: ['Nhiệt độ', 'Chăm sóc bể', 'Cây thủy sinh'],
    isSolved: true,
  },
  {
    title: 'Cách diệt rêu chùm đen (BBA) bám chắc trên đá lũa và lá cây thủy sinh?',
    content: 'Hồ thủy sinh của em bị rêu chùm đen mọc lông lá cứng ngắc trên đầu lũa với rìa lá ráy, lấy tay chà không ra. Có cách nào trị dứt điểm không ạ?',
    answer: 'Có 2 cách hiệu quả nhất: 1) Dùng xi-lanh xịt trực tiếp Oxy Già (H2O2 3%) hoặc dung dịch diệt rêu chuyên dụng Seachem Excel trực tiếp vào rêu (tắt lọc 15 phút rồi bật lại). 2) Thả tép Amano hoặc cá Nô Lệ (SAE) vào gặm rêu sau khi rêu bị suy yếu chuyển sang màu xám trắng.',
    tags: ['Diệt rêu', 'Rêu chùm đen', 'Thủy sinh'],
    isSolved: true,
  },
  {
    title: 'Có nên bật đèn hồ cá 24/24 giờ không hay bật mấy tiếng 1 ngày?',
    content: 'Em mới tập chơi nên bật đèn suốt đêm cho đẹp nhà. Không biết bật liên tục như vậy có ảnh hưởng gì tới cá và rêu hại không?',
    answer: 'Tuyệt đối không bật đèn 24/24! Việc bật quá lâu làm cá bị stress suy giảm miễn dịch và làm rêu hại bùng nổ khủng thiếp. Thời gian bật đèn chuẩn nhất là từ 6 - 8 tiếng mỗi ngày (có thể chia làm 2 nhịp bật sáng và chiều) kết hợp dùng ngắt hẹn giờ Timer.',
    tags: ['Đèn thủy sinh', 'Chăm sóc bể', 'Mẹo bể cá'],
    isSolved: true,
  },
  {
    title: 'Cách thay nước hồ cá chuẩn không làm cá bị sốc pH hay sốc nhiệt?',
    content: 'Mỗi lần em thay 50% nước máy trực tiếp từ vòi vào là cá lại bơi hoảng loạn rồi ngáp ngáp. Cho em hỏi quy trình thay nước đúng là thế nào?',
    answer: 'Nước máy chứa nhiều khí Clo sát khuẩn. Quy trình đúng: 1) Trích nước máy ra xô chứa trước 24h cho bay hết Clo hoặc châm dung dịch khử Clo cấp tốc. 2) Mỗi lần thay chỉ nên rút 20-30% thể tích nước bể. 3) Châm nước mới vào từ từ nhẹ nhàng để cá thích nghi dần.',
    tags: ['Thay nước', 'Khử Clo', 'Sốc nước'],
    isSolved: true,
  },
  {
    title: 'Nuôi tép cảnh chung với cá Betta hoặc cá Guppy có được không?',
    content: 'Em đang có bể 30cm nuôi bầy Guppy với 1 con Betta, muốn thả thêm vài con tép đỏ Neocaridina dọn dẹp đáy hồ có bị ăn thịt không ạ?',
    answer: 'Cá Betta có bản tính hung dữ bản năng hunt mồi rất cao nên sẽ săn và nuốt chửng tép cảnh. Cá Guppy lớn cũng có thể rỉa tép con mới nở. Nếu muốn nuôi chung tép với cá, bể cần có nhiều rêu Java, bụi cây rậm rạp làm nơi ẩn nấp cho tép hoặc chỉ nuôi chung với cá hiền như cá Trâm, cá Chuột Pygmy.',
    tags: ['Tép cảnh', 'Cá Betta', 'Tương thích'],
    isSolved: true,
  },
  {
    title: 'Cá Betta bị xù vẩy, bụng trương to bơi nằm nghiêng ở đáy hồ là bệnh gì?',
    content: 'Con Betta Halfmoon nhà em bụng phình to, vẩy nổi xù lên như trái thông. Cho em hỏi có cách nào chữa không hay cá sắp chết?',
    answer: 'Đây là bệnh Xù Vẩy (Dropsy) do nhiễm trùng vi khuẩn làm suy nội tạng (thận). Bệnh này rất khó chữa nếu phát hiện muộn. Cần cách ly cá ra thau riêng, châm nước nông, sưởi 30°C, pha muối hột + thuốc kháng sinh Epsom Salt hoặc mỡ tetracycline chuyên dụng. Ngưng cho ăn 3 ngày.',
    tags: ['Cá Betta', 'Xù vẩy', 'Trị bệnh cá'],
    isSolved: false,
  },
  {
    title: 'Tại sao hồ cá cảnh lại có nhiều váng dầu nổi lềnh bềnh trên mặt nước?',
    content: 'Mặt nước bể của em có 1 lớp màng óng ánh như mỡ đóng trên mặt làm bong bóng oxy không vỡ được. Nguyên nhân do đâu ạ?',
    answer: 'Váng dầu hình thành do protein dư thừa từ thức ăn cá, bụi bẩn môi trường hoặc vi sinh chết tích tụ. Cách khắc phục: 1) Lắp thêm đầu lọc váng (Skimmer) tích hợp. 2) Dùng khăn giấy thấm nhẹ lên mặt nước. 3) Tăng cường luồng mặt và thả thêm vài con cá Bảy Màu dọn váng.',
    tags: ['Váng dầu', 'Vệ sinh bể', 'Xử lý nước'],
    isSolved: true,
  },
  {
    title: 'Làm sao để cây thủy sinh nhả bọt oxy lấp lánh (Hiện tượng Pearling)?',
    content: 'Em thấy hồ của người ta cây thủy sinh đọng hàng ngàn hạt oxy đung đưa rất đẹp. Bể nhà em trồng cây xanh tốt nhưng sao không thấy nhả bọt?',
    answer: 'Cây nhả bọt oxy khi đạt tốc độ quang hợp cực đại và nước đã bão hòa O2. Điều kiện bắt buộc: 1) Ánh sáng đèn đủ công suất RGB. 2) Cung cấp đủ khí CO2 (khoảng 2-3 giọt/giây). 3) Dinh dưỡng đa trung vi lượng đầy đủ. 4) Dòng chảy luân chuyển nhẹ nhàng.',
    tags: ['Thủy sinh', 'Quang hợp', 'Khí CO2'],
    isSolved: true,
  },
  {
    title: 'Cá Vàng Ranchu ăn loại thức ăn nào để nhanh lên đầu gù mập mạp?',
    content: 'Em mới mua 3 em Ranchu baby, cho ăn cám thường cá không phổng phao mấy. Nhờ anh chị gợi ý loại cám và thực phẩm tốt nhất cho cá vàng ạ!',
    answer: 'Cá Vàng cần hàm lượng protein cao (40-45%) để phát triển gù. Nên dùng các loại cám hạt chìm cao cấp như Hikari Lionhead, Sakura Gold, kết hợp cho ăn thêm Trùng Huyết đông lạnh và Trùn Chỉ tươi rửa sạch 2-3 lần/tuần.',
    tags: ['Cá Vàng', 'Ranchu', 'Thức ăn cá'],
    isSolved: true,
  },
  {
    title: 'Hệ thống lọc thác hay lọc thùng tốt hơn cho hồ thủy sinh 60cm?',
    content: 'Em chuẩn bị lên hồ 60x40x40cm, đang phân vân giữa việc mua lọc thác lớn hay lọc thùng chống ồn. Tư vấn giúp em với ạ!',
    answer: 'Với bể 60cm trở lên, lọc thùng (Canister Filter) là lựa chọn vượt trội hơn hẳn lọc thác. Lọc thùng có thể tích chứa vật liệu lọc lớn hơn gấp 5-10 lần, dòng chảy đều không thoát khí CO2 thủy sinh và vận hành cực kỳ êm ái.',
    tags: ['Lọc thùng', 'Lọc thác', 'Thiết bị bể'],
    isSolved: true,
  },
  {
    title: 'Bao lâu thì nên vệ sinh bông lọc và thay vật liệu lọc nước hồ cá?',
    content: 'Vật liệu lọc như sứ lọc, nham thạch nuôi vi sinh có cần giặt hay thay mới định kỳ không ạ?',
    answer: 'Bông lọc thô giặt 1-2 tuần/lần bằng nước bể rút ra (không giặt bằng nước máy xà phòng làm chết vi sinh). Các vật liệu lọc sinh học như sứ lọc, nham thạch, matrix KHÔNG NÊN thay mới toàn bộ mà chỉ rửa nhẹ cặn bẩn 6 tháng/lần.',
    tags: ['Vật liệu lọc', 'Vệ sinh bể', 'Vi sinh'],
    isSolved: true,
  },
  {
    title: 'Cá Neon bơi lờ đờ tách đàn, màu sắc bị nhạt đi là dấu hiệu bệnh gì?',
    content: 'Trong đàn Neon 20 con có 2 con màu đỏ bị mờ nhạt hẳn, người hơi còng bơi tách biệt góc hồ. Nhờ mọi người chuẩn đoán giúp em!',
    answer: 'Dấu hiệu này thường gặp ở bệnh Neon Tetra Disease (do ký sinh trùng Microsporidian) hoặc sốc môi trường nước độc tích tụ. Cần lập tức cách ly các con bị nhạt màu ra thau riêng để tránh lây nhiễm cho cả đàn.',
    tags: ['Cá Neon', 'Trị bệnh cá', 'Ký sinh trùng'],
    isSolved: true,
  },
  {
    title: 'Ốc Nerita nuôi trong hồ có tự đẻ trứng bùng nổ số lượng như ốc hại không?',
    content: 'Em muốn thả vài con ốc Nerita dọn rêu kính nhưng sợ nó đẻ tràn lan phá bể như ốc sên hại. Ốc Nerita sinh sản thế nào ạ?',
    answer: 'Ốc Nerita tuy có đẻ những đốm trứng nhỏ màu trắng lên lũa đá nhưng trứng của chúng CHỈ NỞ ĐƯỢC TRONG NƯỚC LỢ/NƯỚC MẶN. Trong hồ nước ngọt, trứng sẽ không thể phát triển thành ốc con nên bạn hoàn toàn yên tâm không sợ bùng nổ số lượng!',
    tags: ['Ốc Nerita', 'Ốc hại', 'Sinh sản'],
    isSolved: true,
  },
  {
    title: 'Cá bị đốm trắng li ti như rắc muối khắp vây và thân chữa bằng thuốc gì?',
    content: 'Hôm nay trời lạnh tự nhiên cả hồ cá Neon với Guppy bị nổi nấc đốm trắng khắp người. Đây có phải nấm đốm trắng không và chữa sao ạ?',
    answer: 'Chính xác là bệnh Nấm Đốm Trắng (Ichthyophthirius). Chữa trị cực đơn giản: 1) Cắm sưởi nâng nhiệt độ nước lên 30°C (nhiệt độ này tiêu diệt ký sinh trùng nấm). 2) Đổ muối hột 2g/lít. 3) Nhỏ thuốc Bio Knock 2 đúng liều lượng 1 giọt/10 lít nước. Sau 3 ngày cá sẽ rụng sạch nấm.',
    tags: ['Nấm đốm trắng', 'Trị bệnh cá', 'Bio Knock 2'],
    isSolved: true,
  },
  {
    title: 'Nên dùng phân nền thủy sinh công nghiệp hay nền trộn thủ công?',
    content: 'Em chuẩn bị trồng hồ nhiều cây thủy sinh, phân nền công nghiệp đắt hơn nền trộn khá nhiều. Ưu nhược điểm mỗi loại thế nào ạ?',
    answer: 'Nền công nghiệp (GEX, Cintra, Aquafor, ADA): Dễ chơi, nước trong nhanh, không nhầy đục, thích hợp người mới. Nền trộn thủ công: Dinh dưỡng cực giàu và bền 2-3 năm, giá rẻ nhưng đòi hỏi kỹ thuật phủ cát/sỏi chống xì nền kỹ càng.',
    tags: ['Phân nền', 'Thủy sinh', 'Nền trộn'],
    isSolved: true,
  },
  {
    title: 'Cá Rồng bị xệ mắt và nhát người khi có bóng người đi qua xử lý thế nào?',
    content: 'Em Huyết Long 35cm dạo này hay bơi nép góc bể, hễ có người tới gần là giật mình đâm đầu vào kính xệ mắt. Cách khắc phục thế nào ạ?',
    answer: 'Cá nhát do bị giật mình hoặc môi trường nước có biến động độc tố. Cách khắc phục: 1) Dán decal che 3 mặt bể tạo cảm giác an toàn. 2) Đặt bể vị trí ít người qua lại đột ngột. 3) Hạ mực nước xuống bớt, bật đèn dịu nhẹ. 4) Cho ăn bằng tay từ từ để tạo thói quen thân thiện.',
    tags: ['Cá Rồng', 'Xệ mắt', 'Cá nhát'],
    isSolved: true,
  },
  {
    title: 'Nuôi cá cảnh trong chậu thủy tinh để bàn không có lọc sủi oxy có sống được không?',
    content: 'Em muốn đặt 1 hũ thủy tinh nhỏ 2 lít trên bàn làm việc nuôi vài con cá nhỏ không cắm điện sủi oxy được không?',
    answer: 'Được nhưng chỉ áp dụng cho các dòng cá có cơ quan hô hấp phụ chịu oxy thấp như cá Betta, cá Mún, cá Bảy Màu. Cần chú ý: thả ít cá (1-2 con), cho ăn cực ít và thay 30% nước sạch 2 ngày/lần để tránh ô nhiễm.',
    tags: ['Hồ mini', 'Cá Betta', 'Sủi oxy'],
    isSolved: true,
  },
  {
    title: 'Cách trồng cây Ráy Anubias và Dương Xỉ không bị thối củ trôi nền?',
    content: 'Em cắm củ cây Ráy Anubias xuống đất nền 3 ngày sau thấy thối đen gốc nổi lềnh bềnh. Trồng đúng cách là như nào ạ?',
    answer: 'Cây Ráy Anubias và Dương Xỉ là dòng cây bán sơn địa bám đá/lũa. TUYỆT ĐỐI KHÔNG CHÔN THÂN CỦ (RHIZOME) XUỐNG ĐẤT NỀN vì sẽ làm củ bị úng thối. Cách đúng: Dùng keo dán thủy sinh chuyên dụng hoặc dây cước cột nhẹ thân cây bám lên giá thể Lũa hoặc Đá.',
    tags: ['Cây Ráy', 'Dương xỉ', 'Trồng cây'],
    isSolved: true,
  },
];

export async function seed50Questions(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const questionRepo = dataSource.getRepository(Question);
  const answerRepo = dataSource.getRepository(Answer);

  console.log('🌱 Finding users to author Q&A entries...');
  const users = await userRepo.find({ take: 5 });
  if (!users || users.length === 0) {
    console.log('⚠️ No users found. Skipping Q&A seeding.');
    return;
  }

  const defaultAuthor = users[0];

  console.log('🚀 Generating 50 Q&A items...');
  let insertedCount = 0;

  for (let i = 0; i < 50; i++) {
    const template = faqList[i % faqList.length];
    const uniqueSuffix = i >= faqList.length ? ` (Mẹo #${i + 1})` : '';
    const title = `${template.title}${uniqueSuffix}`;

    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-') + `-${Date.now()}-${i}`;

    const existing = await questionRepo.findOne({ where: { title } });
    if (!existing) {
      const author = users[i % users.length] || defaultAuthor;

      const q = await questionRepo.save(
        questionRepo.create({
          title,
          slug,
          content: template.content,
          authorId: author.id,
          tags: template.tags,
          viewsCount: Math.floor(Math.random() * 600) + 85,
          answersCount: 1,
          isSolved: template.isSolved,
        }),
      );

      // Create expert answer
      await answerRepo.save(
        answerRepo.create({
          questionId: q.id,
          content: template.answer,
          authorId: defaultAuthor.id,
        }),
      );

      insertedCount++;
    }
  }

  console.log(`✅ ${insertedCount} Q&A items successfully inserted into PostgreSQL!`);
}

async function run() {
  console.log('🔌 Connecting to PostgreSQL database...');
  await AppDataSource.initialize();
  console.log('✅ Database connected!');

  await seed50Questions(AppDataSource);

  console.log('🎉 50 Q&A Seed completed successfully!');
  await AppDataSource.destroy();
}

if (require.main === module) {
  run().catch((err) => {
    console.error('❌ Error during seeding 50 Q&A:', err);
    process.exit(1);
  });
}
