import { Injectable, NotFoundException, ConflictException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fish, FishCategory, DifficultyLevel, SwimLevel } from './entities/fish.entity';
import { QueryFishDto, CreateFishDto } from './dto/fish.dto';

@Injectable()
export class FishService implements OnModuleInit {
  constructor(
    @InjectRepository(Fish)
    private readonly fishRepository: Repository<Fish>,
    @InjectRepository(FishCategory)
    private readonly categoryRepository: Repository<FishCategory>,
  ) {}

  async onModuleInit() {
    const count = await this.categoryRepository.count();
    if (count === 0) {
      console.log('🌱 Database is empty. Running auto-seed...');
      await this.autoSeed();
    }
  }

  private async autoSeed() {
    const categoriesData = [
      { name: 'Cá thủy sinh', slug: 'ca-thuy-sinh', description: 'Các loài cá kích thước nhỏ, hiền lành thích hợp nuôi hồ thủy sinh', order: 1 },
      { name: 'Cá Betta', slug: 'ca-betta', description: 'Cá chọi Betta với bộ vây rực rỡ và tính cách độc lập', order: 2 },
      { name: 'Cá Guppy (Bảy màu)', slug: 'ca-guppy', description: 'Dòng cá đẻ con phổ biến, màu sắc phong phú', order: 3 },
      { name: 'Cá Koi & Cá Vàng', slug: 'ca-koi-ca-vang', description: 'Các loài cá cảnh phong thủy hồ ngoài trời và bể kính', order: 4 },
      { name: 'Cá nước ngọt', slug: 'ca-nuoc-nghot', description: 'Các loài cá sinh sống trong môi trường nước ngọt thiên nhiên', order: 5 },
      { name: 'Tép cảnh', slug: 'tep-canh', description: 'Các loại tép màu, tép Sulawesi và tép Ong', order: 6 },
    ];

    const categoriesMap: Record<string, FishCategory> = {};
    for (const catData of categoriesData) {
      let cat = await this.categoryRepository.findOne({ where: { slug: catData.slug } });
      if (!cat) {
        cat = await this.categoryRepository.save(this.categoryRepository.create(catData));
      }
      categoriesMap[catData.slug] = cat;
    }

    const fishList = [
      {
        nameVi: 'Cá Neon Xanh',
        nameEn: 'Neon Tetra',
        scientificName: 'Paracheirodon innesi',
        slug: 'ca-neon-xanh',
        categoryId: categoriesMap['ca-thuy-sinh'].id,
        images: ['https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800'],
        sizeMin: 2,
        sizeMax: 4,
        lifespan: '3–5 năm',
        difficulty: DifficultyLevel.EASY,
        tempMin: 21,
        tempMax: 27,
        phMin: 6.0,
        phMax: 7.0,
        minTankSize: 40,
        swimLevel: SwimLevel.MIDDLE,
        temperament: 'Hiền lành, bơi theo đàn',
        diet: 'Cám hạt nhỏ, trùn chỉ, atemia',
        compatibleFish: 'Cá Bảy màu, cá Sọc ngựa, cá Mây trắng, tép cảnh',
        incompatibleFish: 'Cá La Hán, cá Rồng, cá Cichlid lớn',
        commonDiseases: 'Bệnh nấm trắng, bệnh Neon Tetra Disease',
        description: 'Cá Neon Xanh là loài cá thủy sinh cực kỳ phổ biến nhờ dải màu dạ quang phát sáng quyến rũ dưới ánh đèn hồ cá.',
      },
      {
        nameVi: 'Cá Betta Halfmoon',
        nameEn: 'Siamese Fighting Fish',
        scientificName: 'Betta splendens',
        slug: 'ca-betta-halfmoon',
        categoryId: categoriesMap['ca-betta'].id,
        images: ['https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800'],
        sizeMin: 5,
        sizeMax: 7,
        lifespan: '2–3 năm',
        difficulty: DifficultyLevel.EASY,
        tempMin: 24,
        tempMax: 30,
        phMin: 6.5,
        phMax: 7.5,
        minTankSize: 10,
        swimLevel: SwimLevel.TOP,
        temperament: 'Hung dữ với cùng loài đực, độc lập',
        diet: 'Cám Betta chuyên dụng, lăng quăng, trùn sấy',
        compatibleFish: 'Cá lau kính nhỏ, ốc mút rêu',
        incompatibleFish: 'Cá Betta đực khác, cá Bảy màu đực vây dài',
        commonDiseases: 'Thối vây, xù vảy, nấm gòn',
        description: 'Cá Betta Halfmoon sở hữu bộ đuôi xòe rộng 180 độ như nửa vầng trăng tuyệt đẹp, là lựa chọn số 1 cho các bể cá để bàn.',
      },
      {
        nameVi: 'Cá Guppy Full Red',
        nameEn: 'Full Red Guppy',
        scientificName: 'Poecilia reticulata',
        slug: 'ca-guppy-full-red',
        categoryId: categoriesMap['ca-guppy'].id,
        images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
        sizeMin: 3,
        sizeMax: 5,
        lifespan: '1.5–2 năm',
        difficulty: DifficultyLevel.EASY,
        tempMin: 22,
        tempMax: 28,
        phMin: 7.0,
        phMax: 8.0,
        minTankSize: 20,
        swimLevel: SwimLevel.TOP,
        temperament: 'Hiền lành, sinh sản nhanh',
        diet: 'Cám Thái Inve, Artemia ấp nở',
        compatibleFish: 'Cá Neon, cá Trâm, cá Chuột, tép',
        incompatibleFish: 'Cá săn mồi lớn',
        commonDiseases: 'Túm vây, lắc người, nấm',
        description: 'Dòng Guppy Full Red nổi tiếng với màu đỏ rực toàn thân từ mắt, vây đến thân, sinh sản dễ dàng.',
      },
      {
        nameVi: 'Cá Chuột Panda',
        nameEn: 'Panda Corydoras',
        scientificName: 'Corydoras panda',
        slug: 'ca-chuot-panda',
        categoryId: categoriesMap['ca-thuy-sinh'].id,
        images: ['https://images.unsplash.com/photo-1520301251435-0814c11f4219?w=800'],
        sizeMin: 3,
        sizeMax: 5,
        lifespan: '4–6 năm',
        difficulty: DifficultyLevel.EASY,
        tempMin: 20,
        tempMax: 25,
        phMin: 6.0,
        phMax: 7.2,
        minTankSize: 40,
        swimLevel: SwimLevel.BOTTOM,
        temperament: 'Hiền lành, dọn thức ăn thừa đáy bể',
        diet: 'Cám chìm, trùn chỉ, wafer rêu',
        compatibleFish: 'Tất cả các loài cá hiền lành tầng trung và tầng mặt',
        incompatibleFish: 'Cá lớn dữ dội',
        commonDiseases: 'Mòn râu do nền sỏi sắc nhọn',
        description: 'Cá Chuột Panda có họa tiết vệt đen quanh mắt và vây lưng giống gấu trúc, chuyên dọn sạch thức ăn thừa tầng đáy.',
      },
    ];

    for (const f of fishList) {
      const existing = await this.fishRepository.findOne({ where: { slug: f.slug } });
      if (!existing) {
        await this.fishRepository.save(this.fishRepository.create(f));
      }
    }

    console.log('✅ Auto-seed completed successfully!');
  }

  async findAll(query: QueryFishDto) {
    const { search, category, difficulty, page = 1, limit = 12, sort = 'createdAt', order = 'DESC' } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.fishRepository
      .createQueryBuilder('fish')
      .leftJoinAndSelect('fish.category', 'category')
      .where('fish.isPublished = :isPublished', { isPublished: true });

    if (search) {
      queryBuilder.andWhere(
        '(LOWER(fish.nameVi) LIKE LOWER(:search) OR LOWER(fish.nameEn) LIKE LOWER(:search) OR LOWER(fish.scientificName) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    if (category) {
      // Find category and its child categories or categories containing this parent slug in parentIds
      const targetCat = await this.categoryRepository.findOne({
        where: { slug: category },
        relations: { children: true },
      });

      // Find all categories that have 'category' slug included in their parentIds
      const multiParentCats = await this.categoryRepository.createQueryBuilder('cat')
        .where('cat.parentIds LIKE :catSlug', { catSlug: `%${category}%` })
        .getMany();

      const catIds: string[] = [];
      if (targetCat) catIds.push(targetCat.id);

      if (targetCat?.children && targetCat.children.length > 0) {
        catIds.push(...targetCat.children.map((c) => c.id));
      }

      multiParentCats.forEach((c) => {
        if (!catIds.includes(c.id)) catIds.push(c.id);
      });

      // Special fallback mapping for broad umbrella category 'ca-nuoc-nghot'
      if (category === 'ca-nuoc-nghot') {
        const freshwaterChildSlugs = ['ca-nuoc-nghot', 'ca-thuy-sinh', 'ca-betta', 'ca-guppy', 'ca-koi-ca-vang', 'tep-canh', 'oc-canh'];
        const freshwaterCats = await this.categoryRepository.find({
          where: freshwaterChildSlugs.map((s) => ({ slug: s })),
        });
        freshwaterCats.forEach((c) => {
          if (!catIds.includes(c.id)) catIds.push(c.id);
        });
      }

      if (catIds.length > 0) {
        queryBuilder.andWhere('fish.categoryId IN (:...catIds)', { catIds });
      } else {
        queryBuilder.andWhere('category.slug = :category', { category });
      }
    }

    if (difficulty) {
      queryBuilder.andWhere('fish.difficulty = :difficulty', { difficulty });
    }

    queryBuilder
      .orderBy(`fish.${sort}`, order)
      .skip(skip)
      .take(limit);

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string): Promise<Fish> {
    const fish = await this.fishRepository.findOne({
      where: { slug, isPublished: true },
      relations: { category: true },
    });
    if (!fish) {
      throw new NotFoundException('Không tìm thấy thông tin loài cá này');
    }
    return fish;
  }

  async getCategories() {
    return this.categoryRepository.find({
      order: { order: 'ASC', name: 'ASC' },
    });
  }

  async checkCompatibility(fish1Slug: string, fish2Slug: string) {
    const fish1 = await this.fishRepository.findOne({ where: { slug: fish1Slug } });
    const fish2 = await this.fishRepository.findOne({ where: { slug: fish2Slug } });

    if (!fish1 || !fish2) {
      return {
        isCompatible: false,
        advice: 'Vui lòng chọn 2 loài cá có sẵn trong cơ sở dữ liệu để tra cứu.',
      };
    }

    const tempOverlap =
      fish1.tempMin && fish1.tempMax && fish2.tempMin && fish2.tempMax
        ? Math.max(fish1.tempMin, fish2.tempMin) <= Math.min(fish1.tempMax, fish2.tempMax)
        : true;

    const phOverlap =
      fish1.phMin && fish1.phMax && fish2.phMin && fish2.phMax
        ? Math.max(fish1.phMin, fish2.phMin) <= Math.min(fish1.phMax, fish2.phMax)
        : true;

    const isCompatible = tempOverlap && phOverlap;

    return {
      fish1: { name: fish1.nameVi, slug: fish1.slug, temp: `${fish1.tempMin}-${fish1.tempMax}°C`, ph: `${fish1.phMin}-${fish1.phMax}` },
      fish2: { name: fish2.nameVi, slug: fish2.slug, temp: `${fish2.tempMin}-${fish2.tempMax}°C`, ph: `${fish2.phMin}-${fish2.phMax}` },
      isCompatible,
      tempOverlap,
      phOverlap,
      advice: isCompatible
        ? 'Hai loài này có thông số môi trường tương thích tốt!'
        : 'Cảnh báo: Hai loài này có sự khác biệt về nhiệt độ hoặc pH môi trường sống.',
    };
  }

  async create(dto: CreateFishDto): Promise<Fish> {
    const slug = dto.nameVi
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');

    const existing = await this.fishRepository.findOne({ where: { slug } });
    if (existing) {
      throw new ConflictException('Tên loài cá này đã tồn tại');
    }

    const fish = this.fishRepository.create({ ...dto, slug });
    return this.fishRepository.save(fish);
  }
}
