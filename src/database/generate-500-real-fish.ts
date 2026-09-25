import { DifficultyLevel, SwimLevel } from '../modules/fish/entities/fish.entity';
import { rawUser500FishList, toSlug, RawFishItem } from './seed-user-500-fish';

export interface GeneratedFishData {
  nameVi: string;
  nameEn: string;
  scientificName: string;
  slug: string;
  categorySlug: string;
  images: string[];
  sizeMin: number;
  sizeMax: number;
  lifespan: string;
  difficulty: DifficultyLevel;
  tempMin: number;
  tempMax: number;
  phMin: number;
  phMax: number;
  minTankSize: number;
  swimLevel: SwimLevel;
  temperament: string;
  diet: string;
  compatibleFish: string;
  incompatibleFish: string;
  commonDiseases: string;
  description: string;
}

const defaultImages: Record<string, string[]> = {
  'ca-betta': [
    'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800',
  ],
  'ca-gourami': [
    'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800',
  ],
  'ca-guppy': [
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
  ],
  'ca-tetra': [
    'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800',
  ],
  'ca-koi-ca-vang': [
    'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800',
  ],
  'ca-bien': [
    'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800',
  ],
  default: [
    'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800',
  ],
};

export function generate500RealFish(): GeneratedFishData[] {
  return rawUser500FishList.map((item: RawFishItem) => {
    const slug = toSlug(item.nameVi);
    let difficulty = DifficultyLevel.EASY;
    let swimLevel = SwimLevel.MIDDLE;
    let tempMin = 22;
    let tempMax = 28;
    let phMin = 6.5;
    let phMax = 7.5;
    let minTankSize = 30;
    let sizeMin = 3;
    let sizeMax = 6;
    let lifespan = '3–5 năm';
    let temperament = 'Hiền lành, hòa đồng';
    let diet = 'Ăn tạp, cám hạt nhỏ, trùn chỉ, artemia';
    let compatibleFish = 'Cá Neon, cá Guppy, cá Chuột, tép cảnh';
    let incompatibleFish = 'Cá săn mồi lớn';
    let commonDiseases = 'Nấm trắng, thối vây, xù vảy';
    let description = `${item.nameVi} (${item.scientificName || item.nameEn || ''}) là một trong 500 loài cá cảnh phổ biến được ưa chuộng. Sống khỏe, dễ chăm sóc và thích nghi tốt với môi trường bể cá tại Việt Nam.`;

    if (item.categoryGroup === 'ca-betta') {
      swimLevel = SwimLevel.TOP;
      tempMin = 24;
      tempMax = 30;
      phMin = 6.0;
      phMax = 7.5;
      minTankSize = 10;
      sizeMin = 4;
      sizeMax = 7;
      lifespan = '2–4 năm';
      temperament = 'Lãnh thổ, độc lập';
      diet = 'Cám Betta, lăng quăng, trùn đỏ';
      compatibleFish = 'Ốc mút rêu, cá dọn bể nhỏ';
      incompatibleFish = 'Betta đực khác';
    } else if (item.categoryGroup === 'ca-gourami') {
      swimLevel = SwimLevel.TOP;
      tempMin = 23;
      tempMax = 28;
      phMin = 6.0;
      phMax = 7.5;
      sizeMin = 5;
      sizeMax = 12;
      minTankSize = 50;
      if (item.nameVi.includes('khổng lồ') || item.nameVi.includes('tai tượng')) {
        sizeMin = 20;
        sizeMax = 50;
        minTankSize = 300;
        lifespan = '10–20 năm';
      }
    } else if (item.categoryGroup === 'ca-guppy') {
      swimLevel = SwimLevel.TOP;
      tempMin = 22;
      tempMax = 28;
      phMin = 7.0;
      phMax = 8.0;
      minTankSize = 20;
      sizeMin = 2.5;
      sizeMax = 5;
      lifespan = '1.5–3 năm';
    } else if (item.categoryGroup === 'ca-tetra') {
      swimLevel = SwimLevel.MIDDLE;
      tempMin = 21;
      tempMax = 27;
      phMin = 5.5;
      phMax = 7.2;
      minTankSize = 40;
      sizeMin = 2;
      sizeMax = 5;
      temperament = 'Bơi theo đàn, hiền lành';
    } else if (item.categoryGroup === 'ca-rasbora-danio') {
      swimLevel = SwimLevel.TOP;
      tempMin = 20;
      tempMax = 26;
      phMin = 6.0;
      phMax = 7.5;
      minTankSize = 30;
      sizeMin = 1.5;
      sizeMax = 6;
    } else if (item.categoryGroup === 'ca-chuot-cory') {
      swimLevel = SwimLevel.BOTTOM;
      tempMin = 20;
      tempMax = 26;
      phMin = 6.0;
      phMax = 7.5;
      minTankSize = 40;
      sizeMin = 3;
      sizeMax = 7;
      lifespan = '4–8 năm';
      temperament = 'Hiền lành, dọn đáy bể';
      diet = 'Cám chìm, trùn chỉ, wafer rêu';
    } else if (item.categoryGroup === 'ca-pleco-lau-kinh') {
      swimLevel = SwimLevel.BOTTOM;
      tempMin = 23;
      tempMax = 29;
      phMin = 6.5;
      phMax = 7.5;
      minTankSize = 60;
      sizeMin = 6;
      sizeMax = 25;
      difficulty = DifficultyLevel.MEDIUM;
      temperament = 'Hiền lành, dọn rêu kính';
      diet = 'Rêu hại, cám chìm rêu tảo';
    } else if (item.categoryGroup === 'ca-chach-loach') {
      swimLevel = SwimLevel.BOTTOM;
      tempMin = 23;
      tempMax = 28;
      phMin = 6.0;
      phMax = 7.5;
      minTankSize = 50;
      sizeMin = 5;
      sizeMax = 15;
    } else if (item.categoryGroup === 'ca-koi-ca-vang') {
      swimLevel = SwimLevel.ALL;
      tempMin = 18;
      tempMax = 25;
      phMin = 7.0;
      phMax = 8.0;
      minTankSize = 100;
      sizeMin = 10;
      sizeMax = 45;
      lifespan = '8–25 năm';
    } else if (item.categoryGroup === 'cichlid-chau-phi') {
      swimLevel = SwimLevel.MIDDLE;
      tempMin = 24;
      tempMax = 28;
      phMin = 7.8;
      phMax = 8.6;
      minTankSize = 150;
      sizeMin = 8;
      sizeMax = 20;
      difficulty = DifficultyLevel.MEDIUM;
      temperament = 'Hung dữ, lãnh thổ mạnh';
    } else if (item.categoryGroup === 'cichlid-nam-my') {
      swimLevel = SwimLevel.MIDDLE;
      tempMin = 24;
      tempMax = 30;
      phMin = 6.0;
      phMax = 7.2;
      minTankSize = 80;
      sizeMin = 5;
      sizeMax = 25;
    } else if (item.categoryGroup === 'ca-cau-vong') {
      swimLevel = SwimLevel.TOP;
      tempMin = 22;
      tempMax = 27;
      phMin = 7.0;
      phMax = 8.0;
      minTankSize = 80;
      sizeMin = 4;
      sizeMax = 12;
    } else if (item.categoryGroup === 'ca-killifish-ti-hon') {
      swimLevel = SwimLevel.TOP;
      tempMin = 20;
      tempMax = 26;
      phMin = 6.0;
      phMax = 7.2;
      minTankSize = 20;
      sizeMin = 2;
      sizeMax = 6;
    } else if (item.categoryGroup === 'ca-noc-dac-biet') {
      swimLevel = SwimLevel.MIDDLE;
      tempMin = 24;
      tempMax = 28;
      phMin = 6.8;
      phMax = 7.8;
      minTankSize = 40;
      sizeMin = 3;
      sizeMax = 15;
      difficulty = DifficultyLevel.HARD;
      temperament = 'Tò mò, hay rỉa vây';
      diet = 'Ốc hại, tôm nhỏ, trùn đông lạnh';
    } else if (item.categoryGroup === 'ca-san-moi-arowana') {
      swimLevel = SwimLevel.TOP;
      tempMin = 25;
      tempMax = 31;
      phMin = 6.5;
      phMax = 7.5;
      minTankSize = 400;
      sizeMin = 30;
      sizeMax = 90;
      difficulty = DifficultyLevel.HARD;
      lifespan = '10–25 năm';
      temperament = 'Cá săn mồi lớn';
      diet = 'Tôm tươi, dế, cá mồi';
    } else if (item.categoryGroup === 'ca-bien') {
      swimLevel = SwimLevel.ALL;
      tempMin = 24;
      tempMax = 27;
      phMin = 8.1;
      phMax = 8.4;
      minTankSize = 100;
      sizeMin = 5;
      sizeMax = 20;
      difficulty = DifficultyLevel.HARD;
    }

    const imgs = defaultImages[item.categoryGroup] || defaultImages.default;

    return {
      nameVi: item.nameVi,
      nameEn: item.nameEn || item.nameVi,
      scientificName: item.scientificName || item.nameVi,
      slug,
      categorySlug: item.categoryGroup,
      images: imgs,
      sizeMin,
      sizeMax,
      lifespan,
      difficulty,
      tempMin,
      tempMax,
      phMin,
      phMax,
      minTankSize,
      swimLevel,
      temperament,
      diet,
      compatibleFish,
      incompatibleFish,
      commonDiseases,
      description,
    };
  });
}
