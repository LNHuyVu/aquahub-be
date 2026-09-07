import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

import { User } from '../modules/users/entities/user.entity';
import {
  Listing,
  ListingCategory,
  ListingComment,
  ListingLike,
  ListingReport,
  ListingStatus,
  ListingCondition,
  PriceType,
} from '../modules/listings/entities/listing.entity';
import { Fish, FishCategory } from '../modules/fish/entities/fish.entity';
import { Post, Comment, Like } from '../modules/posts/entities/post.entity';
import { Question, Answer } from '../modules/questions/entities/question.entity';
import { Tank, TankFish, TankLog } from '../modules/tanks/entities/tank.entity';
import { Article } from '../modules/articles/entities/article.entity';
import { Ad } from '../modules/ads/entities/ad.entity';
import { TrafficLog } from '../modules/traffic/entities/traffic-log.entity';

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
    Listing,
    ListingCategory,
    ListingComment,
    ListingLike,
    ListingReport,
    TrafficLog,
  ],
  synchronize: true,
});

const sampleListings = [
  {
    title: 'Thanh lý bầy cá Bảy Màu Guppy Full Gold vây tai bướm thuần chủng',
    description: 'Bầy Guppy Full Gold nhà ép được 3 tháng tuổi, vây tai bướm xòe quạt cực to. Cá khỏe mạnh ăn cám xịn. Đã tiêm ngừa cúp vây. Giá 150k / cặp.',
    price: 150000,
    priceType: PriceType.FIXED,
    condition: ListingCondition.NEW,
    images: ['https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800'],
    contactName: 'Trần Minh',
    contactPhone: '0988123456',
    contactZalo: '0988123456',
    province: 'Hà Nội',
    district: 'Quận Cầu Giấy',
    ward: 'Phường Dịch Vọng',
    streetAddress: '123 Đường Cầu Giấy',
    shippingAvailable: true,
    shippingNote: 'Ship COD toàn quốc bọc oxy an toàn',
    catSlug: 'ca-canh-nuoc-ngot',
  },
  {
    title: 'Bán hồ kính dán keo đen siêu trong 60x40x40cm kính 8 li mài vi tính',
    description: 'Nâng cấp lên bể 1m2 nên nhượng lại bể 60x40x40cm kính siêu trong 8 li dán keo đen siêu mỏng đẹp. Kính không vết trầy xước. Giá 450k.',
    price: 450000,
    priceType: PriceType.NEGOTIABLE,
    condition: ListingCondition.LIKE_NEW,
    images: ['https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800'],
    contactName: 'Nguyễn Nam',
    contactPhone: '0912345678',
    contactZalo: '0912345678',
    province: 'TP. Hồ Chí Minh',
    district: 'Quận 1',
    ward: 'Phường Bến Nghé',
    streetAddress: '45 Lê Duẩn',
    shippingAvailable: false,
    shippingNote: 'Xem và chở trực tiếp tại nhà',
    catSlug: 'be-ca-kinh',
  },
  {
    title: 'Thanh lý lọc thùng Atman DF-1300 full vật liệu lọc sứ nham thạch',
    description: 'Lọc thùng Atman DF1300 còn bảo hành 6 tháng, tặng kèm 3 lít sứ lọc Matrix nham thạch loại xịn. Chạy êm ru không tiếng động. Giá 850k.',
    price: 850000,
    priceType: PriceType.FIXED,
    condition: ListingCondition.USED,
    images: ['https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800'],
    contactName: 'Bùi Quang Duy',
    contactPhone: '0977888999',
    contactZalo: '0977888999',
    province: 'Hà Nội',
    district: 'Quận Đống Đa',
    ward: 'Phường Ô Chợ Dừa',
    streetAddress: '88 Xã Đàn',
    shippingAvailable: true,
    shippingNote: 'Ship hỏa tốc nội thành Hà Nội',
    catSlug: 'thiet-bi-loc',
  },
  {
    title: 'Chia sẻ bộ rêu Java bám đá cổ thụ và cây Dương Xỉ Mỹ Nhân thủy sinh',
    description: 'Bụi rêu Java xanh mượt bám vững trên khối đá da voi cổ thụ, dọn rêu hại cực tốt. Thích hợp trang trí trung cảnh bể 40-60cm. Giá 120k.',
    price: 120000,
    priceType: PriceType.FIXED,
    condition: ListingCondition.NEW,
    images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
    contactName: 'Đinh Nguyên Hà',
    contactPhone: '0905111222',
    contactZalo: '0905111222',
    province: 'Đà Nẵng',
    district: 'Quận Hải Châu',
    ward: 'Phường Hòa Cường Bắc',
    streetAddress: '15 Nguyễn Tri Phương',
    shippingAvailable: true,
    shippingNote: 'Ship bọc ẩm đóng xốp',
    catSlug: 'cay-thuy-sinh-reu',
  },
  {
    title: 'Cần bán bầy Tép Đỏ Neocaridina (Red Cherry) màu đốm đẹp đẻ sai',
    description: 'Bầy tép đỏ Red Cherry thuần chủng nuôi nước máy ổn định. Giá 100k / 30 con tặng kèm rêu ươm tép. Tép lột vỏ khỏe đẻ rầm rộ.',
    price: 100000,
    priceType: PriceType.FIXED,
    condition: ListingCondition.NEW,
    images: ['https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=800'],
    contactName: 'Đỗ Thanh Tuấn',
    contactPhone: '0933444555',
    contactZalo: '0933444555',
    province: 'Hà Nội',
    district: 'Quận Hà Đông',
    ward: 'Phường Quang Trung',
    streetAddress: '200 Quang Trung',
    shippingAvailable: true,
    shippingNote: 'Ship bọc oxy nội thành',
    catSlug: 'tep-canh-sinh-vat',
  },
  {
    title: 'Cặp cá Betta Dumbo Halfmoon vây tai bướm sắc nét cực sung',
    description: 'Cá Betta trống vây bướm ánh kim tím, cá mái bụng căng trứng sẵm sàng ép đẻ. Giá 180k / cặp.',
    price: 180000,
    priceType: PriceType.NEGOTIABLE,
    condition: ListingCondition.NEW,
    images: ['https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=800'],
    contactName: 'Lâm Mộng Vân',
    contactPhone: '0944666777',
    contactZalo: '0944666777',
    province: 'TP. Hồ Chí Minh',
    district: 'Quận Bình Thạnh',
    ward: 'Phường 15',
    streetAddress: '55 Điện Biên Phủ',
    shippingAvailable: true,
    shippingNote: 'Ship hỏa tốc Grab/Ahamove',
    catSlug: 'ca-canh-nuoc-ngot',
  },
  {
    title: 'Thanh lý Đèn LED Thủy Sinh Week Aqua M600 RGB full app chỉnh màu',
    description: 'Đèn Week M600 RGB 60cm công suất 45W có App điều khiển ánh sáng bình minh hoàng hôn. Đèn mới dùng 2 tháng còn hộp. Giá 1tr2.',
    price: 1200000,
    priceType: PriceType.FIXED,
    condition: ListingCondition.LIKE_NEW,
    images: ['https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800'],
    contactName: 'Hà Duy Kiệt',
    contactPhone: '0966777888',
    contactZalo: '0966777888',
    province: 'Hà Nội',
    district: 'Quận Thanh Xuân',
    ward: 'Phường Nhân Chính',
    streetAddress: '102 Lê Văn Lương',
    shippingAvailable: true,
    shippingNote: 'Ship toàn quốc bọc chống sốc',
    catSlug: 'den-chieu-sang',
  },
  {
    title: 'Cá Vàng Ranchu Lionhead đầu lụm tròn mập 3 ngón siêu dễ thương',
    description: 'Bầy Ranchu cam trắng đầu gù phồng to thân hình trứng ngắn cực kute. Ăn cám chìm khỏe mạnh. Giá 250k / con.',
    price: 250000,
    priceType: PriceType.FIXED,
    condition: ListingCondition.NEW,
    images: ['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800'],
    contactName: 'Trương Ngọc Ánh',
    contactPhone: '0922333444',
    contactZalo: '0922333444',
    province: 'TP. Hồ Chí Minh',
    district: 'Quận 7',
    ward: 'Phường Tân Phong',
    streetAddress: '100 Nguyễn Văn Linh',
    shippingAvailable: true,
    shippingNote: 'Ship xe khách liên tỉnh',
    catSlug: 'ca-canh-nuoc-ngot',
  },
  {
    title: 'Thức ăn cám Inve N5 Thái Lan hũ 500g hạt chìm dinh dưỡng cao 55% đạm',
    description: 'Cám hạt Inve N5 nhập khẩu Thái Lan giúp cá nhanh phổng phao vây căng bóng, không làm đục nước. Hũ 500g giá 110k.',
    price: 110000,
    priceType: PriceType.FIXED,
    condition: ListingCondition.NEW,
    images: ['https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800'],
    contactName: 'Mai Thanh Sơn',
    contactPhone: '0911222333',
    contactZalo: '0911222333',
    province: 'Hà Nội',
    district: 'Quận Hoàng Mai',
    ward: 'Phường Định Công',
    streetAddress: '78 Giải Phóng',
    shippingAvailable: true,
    shippingNote: 'Ship COD tận nhà',
    catSlug: 'thuc-an-dinh-duong',
  },
  {
    title: 'Bán lũa bonsai ghép sẵn cây Ráy Nana Petite cho bể 40cm',
    description: 'Tiểu cảnh lũa bonsai nghệ thuật dán 8 ngọn Ráy Nana Petite xanh tốt, cây đã bám rễ chắc chắn vào lũa. Giá 350k.',
    price: 350000,
    priceType: PriceType.NEGOTIABLE,
    condition: ListingCondition.NEW,
    images: ['https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800'],
    contactName: 'Trịnh Quốc Việt',
    contactPhone: '0955888999',
    contactZalo: '0955888999',
    province: 'TP. Hồ Chí Minh',
    district: 'Quận Thủ Đức',
    ward: 'Phường Linh Trung',
    streetAddress: '12 Võ Văn Nâng',
    shippingAvailable: true,
    shippingNote: 'Ship bọc thùng xốp đóng gỗ',
    catSlug: 'cay-thuy-sinh-reu',
  },
  {
    title: 'Bình CO2 nhôm 3 lít full khí + Van điện Mufan tự động hẹn giờ',
    description: 'Bộ bình khí CO2 nhôm 3L siêu an toàn kèm van điện Mufan hẹn giờ tắt mở theo đèn. Giúp cây thủy sinh quang hợp nhả bọt cực mạnh. Giá 950k.',
    price: 950000,
    priceType: PriceType.FIXED,
    condition: ListingCondition.LIKE_NEW,
    images: ['https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800'],
    contactName: 'Vũ Tiến Dũng',
    contactPhone: '0988777666',
    contactZalo: '0988777666',
    province: 'Hà Nội',
    district: 'Quận Bắc Từ Liêm',
    ward: 'Phường Cổ Nhuế',
    streetAddress: '300 Phạm Văn Đồng',
    shippingAvailable: true,
    shippingNote: 'Ship COD xe khách',
    catSlug: 'thiet-bi-loc',
  },
  {
    title: 'Thanh lý bầy cá Koi F1 Nhật dài 15-20cm màu đỏ trắng vảy sáng rực',
    description: 'Bầy Koi Kohaku F1 5 con dài 15-20cm dạn người ăn tay. Cá khỏe mạnh không bệnh tật. Giá thanh lý cả bầy 800k.',
    price: 800000,
    priceType: PriceType.NEGOTIABLE,
    condition: ListingCondition.NEW,
    images: ['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800'],
    contactName: 'Phạm Hoàng',
    contactPhone: '0933999888',
    contactZalo: '0933999888',
    province: 'Hà Nội',
    district: 'Quận Long Biên',
    ward: 'Phường Bồ Đề',
    streetAddress: '50 Nguyễn Văn Cừ',
    shippingAvailable: true,
    shippingNote: 'Ship xe tải bọc oxy',
    catSlug: 'ca-canh-nuoc-ngot',
  },
  {
    title: 'Tặng miễn phí 10 con ốc Nerita dọn rêu cho anh em nào qua lấy tại nhà',
    description: 'Hồ nhà mình đẻ dư rêu bám kính nên tặng 10 con ốc Nerita cho anh em nào mới chơi qua lấy trực tiếp vui vẻ giao lưu.',
    price: 0,
    priceType: PriceType.GIVEAWAY,
    condition: ListingCondition.NEW,
    images: ['https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=800'],
    contactName: 'Võ Thu Thủy',
    contactPhone: '0977111222',
    contactZalo: '0977111222',
    province: 'Hà Nội',
    district: 'Quận Ba Đình',
    ward: 'Phường Kim Mã',
    streetAddress: '150 Kim Mã',
    shippingAvailable: false,
    shippingNote: 'Đến tận nhà nhận trực tiếp',
    catSlug: 'tep-canh-sinh-vat',
  },
  {
    title: 'Bộ lọc thác Sobo WP-607H công suất 12W nhỏ gọn cho bể mini 30-40cm',
    description: 'Lọc thác Sobo chạy êm có tích hợp đầu hút váng mặt nước. Phù hợp bể tép hoặc bể cá mini bàn làm việc. Giá 75k.',
    price: 75000,
    priceType: PriceType.FIXED,
    condition: ListingCondition.NEW,
    images: ['https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800'],
    contactName: 'Hoàng Văn Hiếu',
    contactPhone: '0966111333',
    contactZalo: '0966111333',
    province: 'Hải Phòng',
    district: 'Quận Ngô Quyền',
    ward: 'Phường Lạch Tray',
    streetAddress: '88 Lạch Tray',
    shippingAvailable: true,
    shippingNote: 'Ship COD viettel post',
    catSlug: 'thiet-bi-loc',
  },
  {
    title: 'Cần mua thanh lý quạt làm mát hồ cá 4 quạt siêu êm còn dùng tốt',
    description: 'Mùa hè hồ nóng 31 độ cá bị sốc nhiệt nên em cần mua lại 1 bộ quạt làm mát 4 quạt giảm 3 độ C. Anh em nào thừa để lại em nhé!',
    price: 150000,
    priceType: PriceType.CONTACT,
    condition: ListingCondition.USED,
    images: ['https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800'],
    contactName: 'Cao Văn Thiên',
    contactPhone: '0944888777',
    contactZalo: '0944888777',
    province: 'TP. Hồ Chí Minh',
    district: 'Quận Tân Bình',
    ward: 'Phường 12',
    streetAddress: '20 Hoàng Hoa Thám',
    shippingAvailable: true,
    shippingNote: 'Nhận ship COD tận nhà',
    catSlug: 'phu-kien-khac',
  },
  {
    title: 'Bán cặp cá Phượng Hoàng Lam (German Blue Ram) màu xanh metallic sinh sản',
    description: 'Cặp Phượng Hoàng Lam đẻ trứng 2 lứa, màu xanh ánh kim lấp lánh cực đẹp dưới ánh đèn. Cá hiền lành thích hợp hồ cây. Giá 220k / cặp.',
    price: 220000,
    priceType: PriceType.FIXED,
    condition: ListingCondition.NEW,
    images: ['https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800'],
    contactName: 'Đặng Hải Long',
    contactPhone: '0911999000',
    contactZalo: '0911999000',
    province: 'TP. Hồ Chí Minh',
    district: 'Quận 3',
    ward: 'Phường Võ Thị Sáu',
    streetAddress: '10 Nam Kỳ Khởi Nghĩa',
    shippingAvailable: true,
    shippingNote: 'Ship xe khách màng bọc oxy',
    catSlug: 'ca-canh-nuoc-ngot',
  },
  {
    title: 'Bao phân nền GEX Đỏ 8kg trồng cây thủy sinh nước siêu trong',
    description: 'Phân nền Nhật Bản GEX Đỏ hạt mỏng không tan nước, nhả dinh dưỡng nhẹ nhàng cho cây thủy sinh. Túi 8kg nguyên tem giá 380k.',
    price: 380000,
    priceType: PriceType.FIXED,
    condition: ListingCondition.NEW,
    images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
    contactName: 'Phan Đình Tùng',
    contactPhone: '0977222333',
    contactZalo: '0977222333',
    province: 'Hà Nội',
    district: 'Quận Hai Bà Trưng',
    ward: 'Phường Bách Khoa',
    streetAddress: '50 Tạ Quang Bửu',
    shippingAvailable: true,
    shippingNote: 'Ship COD toàn quốc',
    catSlug: 'phan-nen-cot-nen',
  },
  {
    title: 'Bán bầy cá Chuột Panda (Corydoras Panda) 10 con dọn thức ăn thừa đáy bể',
    description: 'Cá Chuột Panda mắt đen vây chấm đen hình gấu trúc siêu kute, chuyên dọn phân và thức ăn cá thừa đọng dưới cát. Giá 180k / bầy 10 con.',
    price: 180000,
    priceType: PriceType.FIXED,
    condition: ListingCondition.NEW,
    images: ['https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800'],
    contactName: 'Nguyễn Khiếu Phong',
    contactPhone: '0903333444',
    contactZalo: '0903333444',
    province: 'Hà Nội',
    district: 'Quận Nam Từ Liêm',
    ward: 'Phường Mỹ Đình 1',
    streetAddress: '88 Lê Đức Thọ',
    shippingAvailable: true,
    shippingNote: 'Ship bọc oxy nội thành',
    catSlug: 'ca-canh-nuoc-ngot',
  },
  {
    title: 'Thùng xốp ươm tép & thả cá mini đẻ ngoài trời bọc cách nhiệt 50x40cm',
    description: 'Thùng xốp dày dặn đã dán bạt chống thấm nước dùng ép cá betta hoặc nuôi tép sinh sản ngoài trời mát mẻ. Giá 50k / thùng.',
    price: 50000,
    priceType: PriceType.FIXED,
    condition: ListingCondition.LIKE_NEW,
    images: ['https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800'],
    contactName: 'Ngô Văn Bắc',
    contactPhone: '0988222111',
    contactZalo: '0988222111',
    province: 'Hà Nội',
    district: 'Quận Hoàn Kiếm',
    ward: 'Phường Hàng Bạc',
    streetAddress: '10 Hàng Bạc',
    shippingAvailable: false,
    shippingNote: 'Lấy trực tiếp tại nhà',
    catSlug: 'be-ca-kinh',
  },
  {
    title: 'Chai Men Vi Sinh ExtraBio 500ml giúp làm trong nước xử lý độc tố NH3/NO2',
    description: 'Men vi sinh ExtraBio vi sinh sống mật độ cao giúp nước bể kính trong vắt như lavabo, phân hủy phân cá cực nhanh. Dung tích 500ml giá 85k.',
    price: 85000,
    priceType: PriceType.FIXED,
    condition: ListingCondition.NEW,
    images: ['https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800'],
    contactName: 'Vũ Tiến Dũng',
    contactPhone: '0988777666',
    contactZalo: '0988777666',
    province: 'Hà Nội',
    district: 'Quận Bắc Từ Liêm',
    ward: 'Phường Cổ Nhuế',
    streetAddress: '300 Phạm Văn Đồng',
    shippingAvailable: true,
    shippingNote: 'Ship COD viettelpost toàn quốc',
    catSlug: 'phu-kien-khac',
  },
];

export async function seed20Listings(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const listingRepo = dataSource.getRepository(Listing);
  const categoryRepo = dataSource.getRepository(ListingCategory);

  console.log('🌱 Finding users and categories for marketplace listings...');
  const users = await userRepo.find({ take: 5 });
  const categories = await categoryRepo.find();

  if (!users || users.length === 0) {
    console.log('⚠️ No users found. Skipping marketplace listings seed.');
    return;
  }

  const defaultUser = users[0];

  console.log('🚀 Generating 20 marketplace listings...');
  let insertedCount = 0;

  for (let i = 0; i < sampleListings.length; i++) {
    const item = sampleListings[i];

    const slug = item.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-') + `-${Date.now()}-${i}`;

    const existing = await listingRepo.findOne({ where: { title: item.title } });
    if (!existing) {
      const user = users[i % users.length] || defaultUser;
      const category = categories.find((c) => c.slug === item.catSlug) || categories[0] || null;

      await listingRepo.save(
        listingRepo.create({
          title: item.title,
          slug,
          description: item.description,
          price: item.price,
          priceType: item.priceType,
          condition: item.condition,
          status: ListingStatus.ACTIVE,
          images: item.images,
          contactName: item.contactName,
          contactPhone: item.contactPhone,
          contactZalo: item.contactZalo,
          province: item.province,
          district: item.district,
          ward: item.ward,
          streetAddress: item.streetAddress,
          shippingAvailable: item.shippingAvailable,
          shippingNote: item.shippingNote,
          views: Math.floor(Math.random() * 300) + 40,
          likesCount: Math.floor(Math.random() * 15) + 2,
          userId: user.id,
          categoryId: category ? category.id : undefined,
        }),
      );

      insertedCount++;
    }
  }

  console.log(`✅ ${insertedCount} marketplace listings successfully inserted into PostgreSQL!`);
}

async function run() {
  console.log('🔌 Connecting to PostgreSQL database...');
  await AppDataSource.initialize();
  console.log('✅ Database connected!');

  await seed20Listings(AppDataSource);

  console.log('🎉 20 Marketplace Listings Seed completed successfully!');
  await AppDataSource.destroy();
}

if (require.main === module) {
  run().catch((err) => {
    console.error('❌ Error during seeding 20 listings:', err);
    process.exit(1);
  });
}
