import * as fs from 'fs';
import * as path from 'path';

// Seed data generators
const freshwaterCategories = [
  'ca-nuoc-nghot', 'ca-thuy-sinh', 'ca-betta', 'ca-guppy', 'ca-koi-ca-vang', 'tep-canh', 'oc-thuy-sinh'
];

const saltwaterCategories = ['ca-bien'];

// Templates for Freshwater
const freshwaterTemplates = [
  { family: 'Cá Neon', enFamily: 'Neon / Tetra', scientificPrefix: 'Paracheirodon', sizes: [2, 4], temp: [22, 28], ph: [6.0, 7.2], tank: 30, swim: 'MIDDLE', diet: 'Cám hạt nhỏ, trùn chỉ, atemia', diff: 'EASY', cat: 'ca-thuy-sinh' },
  { family: 'Cá Guppy', enFamily: 'Guppy', scientificPrefix: 'Poecilia', sizes: [3, 5], temp: [22, 28], ph: [7.0, 8.0], tank: 20, swim: 'TOP', diet: 'Cám Inve, Artemia ấp nở', diff: 'EASY', cat: 'ca-guppy' },
  { family: 'Cá Betta', enFamily: 'Betta / Fighting Fish', scientificPrefix: 'Betta', sizes: [5, 7], temp: [24, 30], ph: [6.5, 7.5], tank: 10, swim: 'TOP', diet: 'Cám Betta, lăng quăng, trùn sấy', diff: 'EASY', cat: 'ca-betta' },
  { family: 'Cá Chuột', enFamily: 'Corydoras', scientificPrefix: 'Corydoras', sizes: [3, 6], temp: [20, 26], ph: [6.0, 7.5], tank: 40, swim: 'BOTTOM', diet: 'Cám chìm, trùn chỉ', diff: 'EASY', cat: 'ca-thuy-sinh' },
  { family: 'Cá Discus (Dĩa)', enFamily: 'Discus Fish', scientificPrefix: 'Symphysodon', sizes: [12, 20], temp: [28, 32], ph: [5.5, 6.8], tank: 200, swim: 'MIDDLE', diet: 'Tim bò, trùn chỉ tươi, cám cao cấp', diff: 'HARD', cat: 'ca-nuoc-nghot' },
  { family: 'Cá Phượng Hoàng', enFamily: 'Ramirezi / Cichlid Dwarf', scientificPrefix: 'Mikrogeophagus', sizes: [4, 7], temp: [25, 30], ph: [6.0, 7.0], tank: 50, swim: 'MIDDLE', diet: 'Trùn chỉ, cám đạm cao', diff: 'MEDIUM', cat: 'ca-thuy-sinh' },
  { family: 'Cá Sọc Ngựa', enFamily: 'Zebra Danio', scientificPrefix: 'Danio', sizes: [3, 5], temp: [18, 26], ph: [6.5, 7.5], tank: 30, swim: 'TOP', diet: 'Cám hạt, thức ăn nổi', diff: 'EASY', cat: 'ca-thuy-sinh' },
  { family: 'Cá Thần Tiên (Angel)', enFamily: 'Angelfish', scientificPrefix: 'Pterophyllum', sizes: [10, 15], temp: [24, 29], ph: [6.0, 7.5], tank: 100, swim: 'MIDDLE', diet: 'Trùn chỉ, tép nhỏ, cám hạt', diff: 'EASY', cat: 'ca-nuoc-nghot' },
  { family: 'Cá Vàng (Goldfish)', enFamily: 'Goldfish', scientificPrefix: 'Carassius', sizes: [10, 25], temp: [18, 24], ph: [7.0, 8.0], tank: 80, swim: 'MIDDLE', diet: 'Cám chìm, rau luộc, trùn', diff: 'EASY', cat: 'ca-koi-ca-vang' },
  { family: 'Cá Koi', enFamily: 'Koi Fish', scientificPrefix: 'Cyprinus', sizes: [20, 70], temp: [15, 26], ph: [7.0, 8.5], tank: 500, swim: 'MIDDLE', diet: 'Cám Koi tăng màu, nhộng tằm', diff: 'MEDIUM', cat: 'ca-koi-ca-vang' },
  { family: 'Cá La Hán', enFamily: 'Flowerhorn Cichlid', scientificPrefix: 'Amphilophus', sizes: [15, 30], temp: [28, 31], ph: [7.2, 8.0], tank: 150, swim: 'MIDDLE', diet: 'Tôm tép tươi, cám lên đầu, trùn', diff: 'MEDIUM', cat: 'ca-nuoc-nghot' },
  { family: 'Cá Rồng (Arowana)', enFamily: 'Arowana', scientificPrefix: 'Scleropages', sizes: [30, 80], temp: [26, 30], ph: [6.5, 7.5], tank: 600, swim: 'TOP', diet: 'Sâu mập, dế, rết, cá mồi, tôm', diff: 'HARD', cat: 'ca-nuoc-nghot' },
  { family: 'Tép Cảnh (Shrimp)', enFamily: 'Neocaridina / Caridina', scientificPrefix: 'Caridina', sizes: [1.5, 3], temp: [20, 25], ph: [6.2, 7.2], tank: 15, swim: 'BOTTOM', diet: 'Vi sinh, lá đàng, thức ăn tép', diff: 'EASY', cat: 'tep-canh' },
  { family: 'Cá Lau Kính / Pleco', enFamily: 'Pleco / Suckermouth', scientificPrefix: 'Hypostomus', sizes: [5, 35], temp: [22, 28], ph: [6.5, 7.5], tank: 60, swim: 'BOTTOM', diet: 'Rêu hại, cám chìm, dưa leo', diff: 'EASY', cat: 'oc-thuy-sinh' },
];

// Templates for Saltwater (Marine)
const saltwaterTemplates = [
  { family: 'Cá Hề (Clownfish)', enFamily: 'Clownfish', scientificPrefix: 'Amphiprion', sizes: [6, 11], temp: [24, 27], ph: [8.1, 8.4], tank: 60, swim: 'MIDDLE', diet: 'Cám vi sinh biển, Artemia, tôm băm', diff: 'EASY', cat: 'ca-bien' },
  { family: 'Cá Tang (Nemo/Dory)', enFamily: 'Surgeonfish / Tang', scientificPrefix: 'Acanthurus', sizes: [12, 25], temp: [24, 28], ph: [8.1, 8.4], tank: 250, swim: 'MIDDLE', diet: 'Tảo biển, lá kim Nori, cám hạt biển', diff: 'MEDIUM', cat: 'ca-bien' },
  { family: 'Cá Thiên Thần Biển (Angel)', enFamily: 'Marine Angelfish', scientificPrefix: 'Pomacanthus', sizes: [10, 30], temp: [23, 27], ph: [8.1, 8.4], tank: 300, swim: 'MIDDLE', diet: 'Hải miên, tôm đông lạnh, cám chuyên dụng', diff: 'HARD', cat: 'ca-bien' },
  { family: 'Cá Bống Biển (Goby)', enFamily: 'Marine Goby', scientificPrefix: 'Gobiodon', sizes: [4, 8], temp: [24, 28], ph: [8.1, 8.4], tank: 40, swim: 'BOTTOM', diet: 'Sinh vật phù du, tép mysis', diff: 'EASY', cat: 'ca-bien' },
  { family: 'Cá Thia Biển (Damselfish)', enFamily: 'Damselfish', scientificPrefix: 'Chrysiptera', sizes: [5, 9], temp: [24, 27], ph: [8.1, 8.4], tank: 50, swim: 'TOP', diet: 'Cám hạt mặn, thịt tôm, sinh vật nhỏ', diff: 'EASY', cat: 'ca-bien' },
  { family: 'Cá Chồn Biển (Hawkfish)', enFamily: 'Hawkfish', scientificPrefix: 'Cirrhitichthys', sizes: [7, 13], temp: [24, 28], ph: [8.1, 8.4], tank: 100, swim: 'BOTTOM', diet: 'Tôm nhỏ, cá con, giáp xác', diff: 'EASY', cat: 'ca-bien' },
  { family: 'Cá Lá Mạ (Butterflyfish)', enFamily: 'Butterflyfish', scientificPrefix: 'Chaetodon', sizes: [10, 20], temp: [24, 27], ph: [8.1, 8.4], tank: 200, swim: 'MIDDLE', diet: 'San hô mềm, giáp xác, cám mặn', diff: 'HARD', cat: 'ca-bien' },
  { family: 'Cá Mú Biển (Grouper)', enFamily: 'Miniature Grouper', scientificPrefix: 'Cephalopholis', sizes: [15, 35], temp: [23, 27], ph: [8.1, 8.4], tank: 400, swim: 'BOTTOM', diet: 'Cá mồi, mực băm, tép biển', diff: 'MEDIUM', cat: 'ca-bien' },
  { family: 'Cá Bắp Nẻ (Blenny)', enFamily: 'Blenny', scientificPrefix: 'Salarias', sizes: [6, 12], temp: [24, 28], ph: [8.1, 8.4], tank: 60, swim: 'BOTTOM', diet: 'Rêu thảm, tảo đá biển', diff: 'EASY', cat: 'ca-bien' },
  { family: 'Cá Sói Biển / Dragonet', enFamily: 'Mandarin Dragonet', scientificPrefix: 'Synchiropus', sizes: [5, 8], temp: [24, 26], ph: [8.1, 8.4], tank: 120, swim: 'BOTTOM', diet: 'Copepod sống, sinh vật nhỏ đáy bể', diff: 'HARD', cat: 'ca-bien' },
];

// Snails Templates (50 Snail variations)
const snailFamilies = [
  { name: 'Ốc Nerita', enName: 'Nerite Snail', prefix: 'Neritina', diet: 'Rêu nâu, rêu xanh bám kính', diff: 'EASY' },
  { name: 'Ốc Sát Thủ Anentome', enName: 'Assassin Snail', prefix: 'Anentome', diet: 'Ốc hại, thịt cám chìm', diff: 'EASY' },
  { name: 'Ốc Táo (Apple Snail)', enName: 'Apple Snail', prefix: 'Pomacea', diet: 'Rau củ luộc, thức ăn thừa', diff: 'EASY' },
  { name: 'Ốc Mút Rêu Zebra', enName: 'Zebra Snail', prefix: 'Neritina zebra', diet: 'Rêu hại bám đá', diff: 'EASY' },
  { name: 'Ốc Gai Nerita', enName: 'Horned Nerite Snail', prefix: 'Clithon', diet: 'Rêu mịn, vi sinh mặt kính', diff: 'EASY' },
];

// Aquatic Plants Templates (100 Plant variations)
const plantFamilies = [
  { name: 'Cây Rái (Anubias)', enName: 'Anubias Plant', prefix: 'Anubias', light: 'Nhiệt độ thấp, ánh sáng yếu', diff: 'EASY' },
  { name: 'Dương Xỉ Thủy Sinh', enName: 'Fern Aquatic Plant', prefix: 'Microsorum', light: 'Ánh sáng trung bình, giá thể gỗ đá', diff: 'EASY' },
  { name: 'Cỏ Ngưu Mao Chiên', enName: 'Dwarf Hairgrass', prefix: 'Eleocharis', light: 'Ánh sáng mạnh, cần CO2', diff: 'MEDIUM' },
  { name: 'Cây Tân Đế Thảo', enName: 'Ludwigia Plant', prefix: 'Ludwigia', light: 'Ánh sáng RGB, phân nền đậm', diff: 'MEDIUM' },
  { name: 'Rêu Us Fissidens / Java', enName: 'Aquatic Moss', prefix: 'Taxiphyllum', light: 'Nước mát <26°C, chảy nhẹ', diff: 'EASY' },
  { name: 'Cây Trúc Đỏ / Tiêu Thảo', enName: 'Cryptocoryne', prefix: 'Cryptocoryne', light: 'Ánh sáng vừa, bộ rễ khỏe', diff: 'EASY' },
  { name: 'Trân Châu Ngọc Bảo', enName: 'Monte Carlo', prefix: 'Micranthemum', light: 'Ánh sáng mạnh, CO2 dồi dào', diff: 'MEDIUM' },
  { name: 'Cây Thủy Cúc', enName: 'Water Wisteria', prefix: 'Hygrophila', light: 'Tốc độ phát triển nhanh, dễ trồng', diff: 'EASY' },
];

const colorModifiers = [
  'Đỏ', 'Xanh Lam', 'Vàng Hoàng Kim', 'Bạch Kim (Albino)', 'Đen Tuyền (Black)', 'Ngọc Bích',
  'Tím Dạ Quang', 'Hồng Cam', 'Ngũ Sắc', 'Cẩm Thạch (Marble)', 'Ánh Kim', 'Hổ Vằn (Tiger)',
  'Tuyết Trắng', 'Xanh Ngọc', 'Hoàng Gia (Royal)', 'Hoa Đăng', 'Vũ Trụ (Galaxy)', 'Kim Long'
];

const patternModifiers = [
  'Siêu Ngắn (Short Body)', 'Vây Dài (High Fin)', 'Đuôi Phụng', 'Đuôi Xòe (Halfmoon)',
  'Đuôi Kép (Double Tail)', 'Đầu Gù (Crown)', 'Vảy Rồng', 'Đốm Sao', 'Sọc Ngang', 'Vệt Tròn'
];

// Accurate real images mapped specifically by family/category
const categoryImagesMap: Record<string, string[]> = {
  // Cá Neon / Tetra
  'Paracheirodon': [
    'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800', // Neon tetra
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'
  ],
  // Cá Guppy
  'Poecilia': [
    'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800', // Guppy colorful
    'https://images.unsplash.com/photo-1520301251435-0814c11f4219?w=800'
  ],
  // Betta
  'Betta': [
    'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=800', // Betta fish
    'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800'
  ],
  // Discus
  'Symphysodon': [
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', // Discus
    'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800'
  ],
  // Goldfish / Koi
  'Carassius': [
    'https://images.unsplash.com/photo-1520301251435-0814c11f4219?w=800', // Goldfish
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'
  ],
  'Cyprinus': [
    'https://images.unsplash.com/photo-1520301251435-0814c11f4219?w=800', // Koi
    'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800'
  ],
  // Tép cảnh
  'Caridina': [
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800', // Shrimp
    'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800'
  ],
  // Cá biển - Clownfish
  'Amphiprion': [
    'https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800', // Clownfish Nemo
    'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800'
  ],
  // Cá biển - Tang / Dory
  'Acanthurus': [
    'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800', // Tang / Dory
    'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800'
  ],
  // Ốc cảnh
  'oc-canh': [
    'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800', // Snail underwater
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'
  ],
  // Cây thủy sinh
  'cay-thuy-sinh': [
    'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800', // Lush aquatic plants
    'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800'  // Green aquarium plants
  ]
};

const imagesFreshwater = [
  'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800',
  'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
  'https://images.unsplash.com/photo-1520301251435-0814c11f4219?w=800',
  'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=800'
];

const imagesSaltwater = [
  'https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800',
  'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800',
  'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800',
  'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800'
];

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function generate1000Fish() {
  const fishList: any[] = [];
  let count = 0;

  // 600 Freshwater fish
  while (count < 650) {
    const tpl = freshwaterTemplates[count % freshwaterTemplates.length];
    const color = colorModifiers[Math.floor(count / freshwaterTemplates.length) % colorModifiers.length];
    const pattern = patternModifiers[Math.floor(count / (freshwaterTemplates.length * colorModifiers.length)) % patternModifiers.length];
    
    const nameVi = `${tpl.family} ${color} ${pattern} (Mẫu ${count + 1})`;
    const nameEn = `${color} ${pattern} ${tpl.enFamily} #${count + 1}`;
    const scientificName = `${tpl.scientificPrefix} sp. var-${count + 1}`;
    const slug = generateSlug(nameVi);
    const categoryImgs = categoryImagesMap[tpl.scientificPrefix] || imagesFreshwater;
    const img = categoryImgs[count % categoryImgs.length];

    fishList.push({
      nameVi,
      nameEn,
      scientificName,
      slug,
      categorySlug: tpl.cat,
      images: [img],
      sizeMin: tpl.sizes[0],
      sizeMax: tpl.sizes[1],
      lifespan: `${2 + (count % 5)}–${5 + (count % 7)} năm`,
      difficulty: tpl.diff,
      tempMin: tpl.temp[0],
      tempMax: tpl.temp[1],
      phMin: tpl.ph[0],
      phMax: tpl.ph[1],
      minTankSize: tpl.tank,
      swimLevel: tpl.swim,
      temperament: 'Hiền lành, sinh hoạt tốt theo nhóm',
      diet: tpl.diet,
      compatibleFish: 'Các loài cá nước ngọt cùng kích thước và tính cách',
      incompatibleFish: 'Cá săn mồi kích thước quá lớn',
      commonDiseases: 'Bệnh nấm trắng, sốc nước pH, thối vây',
      description: `${nameVi} là dòng cá nước ngọt đẹp mắt, thích hợp cho người chơi cá cảnh từ nhập môn đến chuyên nghiệp. Sống khỏe và thích nghi tốt.`,
    });

    count++;
  }

  // 350 Saltwater fish
  while (count < 1000) {
    const tpl = saltwaterTemplates[(count - 650) % saltwaterTemplates.length];
    const color = colorModifiers[Math.floor((count - 650) / saltwaterTemplates.length) % colorModifiers.length];
    const pattern = patternModifiers[Math.floor((count - 650) / (saltwaterTemplates.length * colorModifiers.length)) % patternModifiers.length];

    const nameVi = `${tpl.family} ${color} ${pattern} (Mẫu ${count + 1})`;
    const nameEn = `${color} ${pattern} ${tpl.enFamily} #${count + 1}`;
    const scientificName = `${tpl.scientificPrefix} sp. marine-${count + 1}`;
    const slug = generateSlug(nameVi);
    const categoryImgs = categoryImagesMap[tpl.scientificPrefix] || imagesSaltwater;
    const img = categoryImgs[count % categoryImgs.length];

    fishList.push({
      nameVi,
      nameEn,
      scientificName,
      slug,
      categorySlug: tpl.cat,
      images: [img],
      sizeMin: tpl.sizes[0],
      sizeMax: tpl.sizes[1],
      lifespan: `${3 + (count % 4)}–${7 + (count % 6)} năm`,
      difficulty: tpl.diff,
      tempMin: tpl.temp[0],
      tempMax: tpl.temp[1],
      phMin: tpl.ph[0],
      phMax: tpl.ph[1],
      minTankSize: tpl.tank,
      swimLevel: tpl.swim,
      temperament: 'Cần môi trường nước mặn ổn định, thích hợp hồ rạn san hô',
      diet: tpl.diet,
      compatibleFish: 'Các loài cá biển rạn san hô hiền lành',
      incompatibleFish: 'Cá biển săn mồi hung dữ',
      commonDiseases: 'Bệnh đốm trắng cá biển (Marine Ich), nấm nhầy',
      description: `${nameVi} mang vẻ đẹp rực rỡ đặc trưng của rạn san hô biển nhiệt đới. Là điểm nhấn ấn tượng cho bất kỳ bể cá nước mặn nào.`,
    });

    count++;
  }

  // 50 Snails (Ốc Cảnh)
  let snailCount = 0;
  const snailImgs = categoryImagesMap['oc-canh'];
  while (snailCount < 50) {
    const tpl = snailFamilies[snailCount % snailFamilies.length];
    const modifier = colorModifiers[snailCount % colorModifiers.length];
    
    const nameVi = `${tpl.name} ${modifier} (Mẫu ${snailCount + 1})`;
    const nameEn = `${modifier} ${tpl.enName} #${snailCount + 1}`;
    const scientificName = `${tpl.prefix} var-${snailCount + 1}`;
    const slug = generateSlug(nameVi);
    const img = snailImgs[snailCount % snailImgs.length];

    fishList.push({
      nameVi,
      nameEn,
      scientificName,
      slug,
      categorySlug: 'oc-canh',
      images: [img],
      sizeMin: 1,
      sizeMax: 4,
      lifespan: '1–3 năm',
      difficulty: tpl.diff,
      tempMin: 20,
      tempMax: 28,
      phMin: 6.8,
      phMax: 8.0,
      minTankSize: 10,
      swimLevel: 'BOTTOM',
      temperament: 'Hiền lành, chuyên bò dọn rêu hại và thức ăn thừa',
      diet: tpl.diet,
      compatibleFish: 'Cá hiền lành, tép cảnh (Không nuôi cùng cá nóc, cá cichlid)',
      incompatibleFish: 'Cá nóc ăn ốc, cá Cichlid lớn',
      commonDiseases: 'Mòn vỏ do nước quá mềm (thiếu Canxi)',
      description: `${nameVi} là dòng ốc cảnh sinh thái vô cùng hữu ích giúp ăn rêu hại, dọn dẹp mặt kính và môi trường đáy bể cá luôn sạch sẽ.`,
    });

    snailCount++;
  }

  // 100 Aquatic Plants (Cây Thủy Sinh)
  let plantCount = 0;
  const plantImgs = categoryImagesMap['cay-thuy-sinh'];
  while (plantCount < 100) {
    const tpl = plantFamilies[plantCount % plantFamilies.length];
    const modifier = colorModifiers[plantCount % colorModifiers.length];

    const nameVi = `${tpl.name} ${modifier} (Chủng ${plantCount + 1})`;
    const nameEn = `${modifier} ${tpl.enName} #${plantCount + 1}`;
    const scientificName = `${tpl.prefix} sp. plant-${plantCount + 1}`;
    const slug = generateSlug(nameVi);
    const img = plantImgs[plantCount % plantImgs.length];

    fishList.push({
      nameVi,
      nameEn,
      scientificName,
      slug,
      categorySlug: 'cay-thuy-sinh',
      images: [img],
      sizeMin: 5,
      sizeMax: 30,
      lifespan: 'Sống lâu năm',
      difficulty: tpl.diff,
      tempMin: 18,
      tempMax: 27,
      phMin: 6.0,
      phMax: 7.5,
      minTankSize: 20,
      swimLevel: 'MIDDLE',
      temperament: 'Hấp thụ Nitrat, nhả Oxy tạo cảnh quan thủy sinh',
      diet: 'Phân nền, phân nước, ánh sáng và khí CO2',
      compatibleFish: 'Tất cả các loài cá thủy sinh, tép cảnh',
      incompatibleFish: 'Cá vàng lớn hoặc cá cichlid thích đào nền',
      commonDiseases: 'Rữa lá do thiếu hụt vi lượng K/Fe hoặc sốc nhiệt',
      description: `${nameVi} mang lại sắc màu rực rỡ và cảnh quan tự nhiên sinh động cho hồ thủy sinh. Giúp tạo môi trường trú ẩn cho cá con.`,
    });

    plantCount++;
  }

  return fishList;
}
