import { Injectable, NotFoundException, ConflictException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fish, FishCategory, DifficultyLevel, SwimLevel } from './entities/fish.entity';
import { Report, ReportTargetType } from '../posts/entities/post.entity';
import { CreateReportDto } from '../posts/dto/posts.dto';
import { QueryFishDto, CreateFishDto } from './dto/fish.dto';

import { applyFuzzySearch, removeVietnameseTones } from '../../common/utils/fuzzy-search';
import { createSlug } from '../../common/utils/slug';

@Injectable()
export class FishService implements OnModuleInit {
  constructor(
    @InjectRepository(Fish)
    private readonly fishRepository: Repository<Fish>,
    @InjectRepository(FishCategory)
    private readonly categoryRepository: Repository<FishCategory>,
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) { }

  async reportFish(userId: string, fishId: string, dto: CreateReportDto) {
    const fish = await this.fishRepository.findOne({ where: { id: fishId } });
    if (!fish) throw new NotFoundException('Thông tin loài cá này không tồn tại');

    const report = this.reportRepository.create({
      reporterId: userId,
      fishId,
      targetType: ReportTargetType.FISH,
      reason: dto.reason,
    });
    await this.reportRepository.save(report);
    return { success: true, message: 'Đã gửi báo cáo phản hồi thông tin loài cá thành công' };
  }


  async onModuleInit() {
    const count = await this.categoryRepository.count();
    if (count === 0) {
      console.log('🌱 Database is empty. Running auto-seed...');
      await this.autoSeed();
    }
  }

  private async autoSeed() {
    const categoriesData = [
      { name: 'Cá thủy sinh', slug: createSlug('Cá thủy sinh'), description: 'Các loài cá kích thước nhỏ, hiền lành thích hợp nuôi hồ thủy sinh', order: 1 },
      { name: 'Cá Betta', slug: createSlug('Cá Betta'), description: 'Cá chọi Betta với bộ vây rực rỡ và tính cách độc lập', order: 2 },
      { name: 'Cá Guppy (Bảy màu)', slug: createSlug('Cá Guppy (Bảy màu)'), description: 'Dòng cá đẻ con phổ biến, màu sắc phong phú', order: 3 },
      { name: 'Cá Koi & Cá Vàng', slug: createSlug('Cá Koi & Cá Vàng'), description: 'Các loài cá cảnh phong thủy hồ ngoài trời và bể kính', order: 4 },
      { name: 'Cá nước ngọt', slug: createSlug('Cá nước ngọt'), description: 'Các loài cá sinh sống trong môi trường nước ngọt thiên nhiên', order: 5 },
      { name: 'Tép cảnh', slug: createSlug('Tép cảnh'), description: 'Các loại tép màu, tép Sulawesi và tép Ong', order: 6 },
      { name: 'Ốc cảnh', slug: createSlug('Ốc cảnh'), description: 'Các loại ốc dọn rêu hại, ốc táo, ốc nerita', order: 7 },
      { name: 'Cây thủy sinh', slug: createSlug('Cây thủy sinh'), description: 'Rêu, dương xỉ, ráy nana và cây cắt cắm', order: 8 },
      { name: 'Thiết bị & Lọc', slug: createSlug('Thiết bị & Lọc'), description: 'Lọc thùng, lọc treo, máy bơm, máy sủi, đèn LED', order: 9 },
      { name: 'Bể cá & Hồ kính', slug: createSlug('Bể cá & Hồ kính'), description: 'Bể kính siêu trong, hồ kính mài vi tính, hồ đúc', order: 10 },
      { name: 'Phụ kiện & Thức ăn', slug: createSlug('Phụ kiện & Thức ăn'), description: 'Phân nền, cốt nền, cám cá, phụ kiện chăm sóc hồ', order: 11 },
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
        slug: createSlug('Cá Neon Xanh'),
        categoryId: categoriesMap[createSlug('Cá thủy sinh')]?.id || categoriesMap['ca-thuy-sinh']?.id,
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
        slug: createSlug('Cá Betta Halfmoon'),
        categoryId: categoriesMap[createSlug('Cá Betta')]?.id || categoriesMap['ca-betta']?.id,
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
        slug: createSlug('Cá Guppy Full Red'),
        categoryId: categoriesMap[createSlug('Cá Guppy (Bảy màu)')]?.id || categoriesMap['ca-guppy']?.id,
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
        slug: createSlug('Cá Chuột Panda'),
        categoryId: categoriesMap[createSlug('Cá thủy sinh')]?.id || categoriesMap['ca-thuy-sinh']?.id,
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
      if (!f.categoryId) continue;
      const existing = await this.fishRepository.findOne({ where: { slug: f.slug } });
      if (!existing) {
        await this.fishRepository.save(this.fishRepository.create(f));
      }
    }

    console.log('✅ Auto-seed completed successfully!');
  }

  async findAll(query: QueryFishDto) {
    const { search, category, difficulty, page = 1, limit = 24, sort = 'createdAt', order = 'DESC' } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.fishRepository
      .createQueryBuilder('fish')
      .leftJoinAndSelect('fish.category', 'category')
      .where('fish.isPublished = :isPublished', { isPublished: true });

    if (search) {
      applyFuzzySearch(queryBuilder, search, [
        'fish.nameVi',
        'fish.nameEn',
        'fish.scientificName',
      ]);

      const cleanSearch = removeVietnameseTones(search);
      const safeClean = cleanSearch.replace(/'/g, "''").replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const safeAccented = search.replace(/'/g, "''");

      queryBuilder.orderBy(
        `CASE 
          WHEN unaccent(fish.nameVi) ~* E'^ca ${safeClean}' THEN 1
          WHEN fish.nameVi ILIKE '%${safeAccented}%' THEN 2
          WHEN unaccent(fish.nameVi) ~* E'\\\\y${safeClean}' THEN 3
          ELSE 4
        END`,
        'ASC',
      );
      queryBuilder.addOrderBy('fish.nameVi', 'ASC');
    } else {
      queryBuilder.orderBy(`fish.${sort}`, order);
    }

    if (category) {
      const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(category);

      let targetCat = await this.categoryRepository.findOne({
        where: isUuid ? { id: category } : [{ slug: category }, { name: category }],
        relations: { children: true },
      });

      const catIds: string[] = [];
      const catSlugs: string[] = [category];

      if (targetCat) {
        catIds.push(targetCat.id);
        if (targetCat.slug) catSlugs.push(targetCat.slug);
        if (targetCat.children && targetCat.children.length > 0) {
          catIds.push(...targetCat.children.map((c) => c.id));
          catSlugs.push(...targetCat.children.map((c) => c.slug).filter(Boolean));
        }

        const multiParentCats = await this.categoryRepository.createQueryBuilder('cat')
          .where('cat.parentIds LIKE :catSlug OR cat.parentId = :parentId', {
            catSlug: `%${targetCat.slug}%`,
            parentId: targetCat.id,
          })
          .getMany();

        multiParentCats.forEach((c) => {
          if (!catIds.includes(c.id)) catIds.push(c.id);
          if (c.slug && !catSlugs.includes(c.slug)) catSlugs.push(c.slug);
        });
      } else if (isUuid) {
        catIds.push(category);
      }

      if (category === 'ca-nuoc-nghot' || targetCat?.slug === 'ca-nuoc-nghot') {
        const freshwaterChildSlugs = ['ca-nuoc-nghot', 'ca-thuy-sinh', 'ca-betta', 'ca-guppy', 'ca-koi-ca-vang', 'tep-canh', 'oc-canh'];
        const freshwaterCats = await this.categoryRepository.find({
          where: freshwaterChildSlugs.map((s) => ({ slug: s })),
        });
        freshwaterCats.forEach((c) => {
          if (!catIds.includes(c.id)) catIds.push(c.id);
          if (c.slug && !catSlugs.includes(c.slug)) catSlugs.push(c.slug);
        });
      }

      const conditions: string[] = [];
      const paramsObj: any = {};

      if (catIds.length > 0) {
        conditions.push('fish.categoryId IN (:...catIds)');
        paramsObj.catIds = catIds;
        catIds.forEach((id, idx) => {
          conditions.push(`fish.categoryIds LIKE :catId${idx}`);
          paramsObj[`catId${idx}`] = `%${id}%`;
        });
      }

      catSlugs.forEach((slug, idx) => {
        conditions.push(`fish.categorySlugs LIKE :catSlug${idx}`);
        conditions.push(`category.slug = :exactSlug${idx}`);
        paramsObj[`catSlug${idx}`] = `%${slug}%`;
        paramsObj[`exactSlug${idx}`] = slug;
      });

      if (conditions.length > 0) {
        queryBuilder.andWhere(`(${conditions.join(' OR ')})`, paramsObj);
      }
    }

    if (difficulty) {
      queryBuilder.andWhere('fish.difficulty = :difficulty', { difficulty });
    }

    if ((query as any).swimLevel) {
      queryBuilder.andWhere('fish.swimLevel = :swimLevel', { swimLevel: (query as any).swimLevel });
    }

    queryBuilder
      .offset(skip)
      .limit(limit);

    console.log('🔍 QUERY BUILDER SQL:\n', queryBuilder.getSql());
    const [items, total] = await queryBuilder.getManyAndCount();

    if (search) {
      const cleanSearch = removeVietnameseTones(search);
      const prefix = `ca ${cleanSearch}`;

      items.sort((a, b) => {
        const nameA = removeVietnameseTones(a.nameVi);
        const nameB = removeVietnameseTones(b.nameVi);

        // Tier 1: Starts with "cá <search>" (e.g. Cá Rồng ...)
        const aPrefix = nameA.startsWith(prefix) ? 1 : 0;
        const bPrefix = nameB.startsWith(prefix) ? 1 : 0;
        if (aPrefix !== bPrefix) return bPrefix - aPrefix;

        // Tier 2: Contains exact accented search text (e.g. "rồng")
        const aAccented = a.nameVi.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
        const bAccented = b.nameVi.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
        if (aAccented !== bAccented) return bAccented - aAccented;

        return nameA.localeCompare(nameB, 'vi');
      });
    }

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
    const categories = await this.categoryRepository.find({
      order: { order: 'ASC', name: 'ASC' },
    });

    const fishList = await this.fishRepository.find({
      select: { id: true, categoryId: true, categoryIds: true, categorySlugs: true },
    });

    return categories.map((cat) => {
      const count = fishList.filter((f) => {
        if (f.categoryId === cat.id) return true;
        if (f.categoryIds && Array.isArray(f.categoryIds) && f.categoryIds.includes(cat.id)) return true;
        if (f.categorySlugs && Array.isArray(f.categorySlugs) && f.categorySlugs.includes(cat.slug)) return true;
        return false;
      }).length;

      return {
        ...cat,
        fishCount: count,
      };
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

  async update(id: string, dto: Partial<CreateFishDto>): Promise<Fish> {
    const fish = await this.fishRepository.findOne({ where: { id } });
    if (!fish) {
      throw new NotFoundException('Không tìm thấy sinh vật này');
    }

    if (dto.nameVi && dto.nameVi !== fish.nameVi) {
      const baseSlug = createSlug(dto.nameVi, 'ca');
      let uniqueSlug = baseSlug;
      let suffix = 1;

      while (await this.fishRepository.findOne({ where: { slug: uniqueSlug } })) {
        const existing = await this.fishRepository.findOne({ where: { slug: uniqueSlug } });
        if (existing && existing.id === id) break;
        uniqueSlug = `${baseSlug}-${suffix++}`;
      }
      fish.slug = uniqueSlug;
    }

    // Process multi-categories
    if (dto.categoryIds && Array.isArray(dto.categoryIds)) {
      fish.categoryIds = dto.categoryIds.filter(Boolean);
      if (fish.categoryIds.length > 0 && !dto.categoryId) {
        fish.categoryId = fish.categoryIds[0];
      }
    }
    if (dto.categorySlugs && Array.isArray(dto.categorySlugs)) {
      fish.categorySlugs = dto.categorySlugs.filter(Boolean);
    }
    if (dto.categoryId) {
      fish.categoryId = dto.categoryId;
    }

    Object.assign(fish, dto);
    return this.fishRepository.save(fish);
  }

  async create(dto: CreateFishDto): Promise<Fish> {
    const baseSlug = createSlug(dto.nameVi || dto.nameEn || '', 'ca');
    let slug = baseSlug;
    let suffix = 1;

    while (await this.fishRepository.findOne({ where: { slug } })) {
      slug = `${baseSlug}-${suffix++}`;
    }

    // Process multi-categories
    let categoryId = dto.categoryId;
    let categoryIds = dto.categoryIds || [];
    let categorySlugs = dto.categorySlugs || [];

    if (categoryIds.length > 0 && !categoryId) {
      categoryId = categoryIds[0];
    }

    const fish = this.fishRepository.create({
      ...dto,
      slug,
      categoryId,
      categoryIds,
      categorySlugs,
    });
    return this.fishRepository.save(fish);
  }

  private createSlug(text: string): string {
    const slug = (text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
    return slug || 'sinh-vat';
  }

  async importFish(itemsInput?: any[]) {
    if (!itemsInput || !Array.isArray(itemsInput) || itemsInput.length === 0) {
      return { success: false, message: 'Không có dữ liệu sinh vật để import', inserted: 0, updated: 0 };
    }

    let inserted = 0;
    let updated = 0;
    let errors = 0;

    // Cache existing categories to avoid redundant DB queries & constraint conflicts
    const allCategories = await this.categoryRepository.find();
    const categoriesBySlug = new Map<string, FishCategory>(allCategories.map((c) => [c.slug, c]));
    const categoriesByName = new Map<string, FishCategory>(allCategories.map((c) => [c.name.toLowerCase(), c]));

    // Helper to get or create category safely
    const getOrCreateCategory = async (catNameOrSlug: string): Promise<FishCategory> => {
      const cleanInput = String(catNameOrSlug).trim();
      if (!cleanInput) {
        let fallback = categoriesBySlug.get('ca-thuy-sinh');
        if (!fallback && allCategories.length > 0) fallback = allCategories[0];
        return fallback!;
      }

      const targetSlug = this.createSlug(cleanInput);
      if (categoriesBySlug.has(targetSlug)) return categoriesBySlug.get(targetSlug)!;
      if (categoriesByName.has(cleanInput.toLowerCase())) return categoriesByName.get(cleanInput.toLowerCase())!;

      try {
        let newCat = this.categoryRepository.create({
          name: cleanInput,
          slug: targetSlug,
          description: `Danh mục ${cleanInput}`,
        });
        newCat = await this.categoryRepository.save(newCat);
        categoriesBySlug.set(newCat.slug, newCat);
        categoriesByName.set(newCat.name.toLowerCase(), newCat);
        return newCat;
      } catch {
        const existing = await this.categoryRepository.findOne({
          where: [{ slug: targetSlug }, { name: cleanInput }],
        });
        if (existing) {
          categoriesBySlug.set(existing.slug, existing);
          categoriesByName.set(existing.name.toLowerCase(), existing);
          return existing;
        }
        return allCategories[0] || categoriesBySlug.values().next().value;
      }
    };

    const validDifficulties = [DifficultyLevel.EASY, DifficultyLevel.MEDIUM, DifficultyLevel.HARD, DifficultyLevel.EXPERT];
    const validSwimLevels = [SwimLevel.TOP, SwimLevel.MIDDLE, SwimLevel.BOTTOM, SwimLevel.ALL];

    const parseNum = (val: any): number | undefined => {
      if (val === null || val === undefined || val === '') return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    };

    for (const item of itemsInput) {
      if (!item || typeof item !== 'object' || !item.nameVi) continue;

      try {
        const rawNameVi = String(item.nameVi).trim();
        if (!rawNameVi) continue;

        let baseSlug = item.slug ? String(item.slug).trim() : this.createSlug(rawNameVi);
        if (!baseSlug) baseSlug = this.createSlug(rawNameVi);

        // 1. Resolve Category
        const rawCategoryList: string[] = [];
        if (Array.isArray(item.categories)) rawCategoryList.push(...item.categories);
        if (Array.isArray(item.categoryNames)) rawCategoryList.push(...item.categoryNames);
        if (Array.isArray(item.categorySlugs)) rawCategoryList.push(...item.categorySlugs);
        if (item.categoryName && typeof item.categoryName === 'string') rawCategoryList.push(item.categoryName);
        if (item.category && typeof item.category === 'string') rawCategoryList.push(item.category);

        const categoryNamesOrSlugs = Array.from(new Set(rawCategoryList.filter((c) => Boolean(c) && typeof c === 'string')));

        let primaryCategory: FishCategory | null = null;
        if (categoryNamesOrSlugs.length > 0) {
          primaryCategory = await getOrCreateCategory(categoryNamesOrSlugs[0]);
        } else if (item.categoryId) {
          primaryCategory = await this.categoryRepository.findOne({ where: { id: item.categoryId } });
        }

        if (!primaryCategory) {
          primaryCategory = await getOrCreateCategory('ca-thuy-sinh');
        }

        const difficulty = validDifficulties.includes(item.difficulty) ? item.difficulty : DifficultyLevel.EASY;
        const swimLevel = validSwimLevels.includes(item.swimLevel) ? item.swimLevel : SwimLevel.MIDDLE;

        let images: string[] = [];
        if (Array.isArray(item.images)) {
          images = item.images.map((img: any) => String(img)).filter(Boolean);
        } else if (item.images && typeof item.images === 'string') {
          images = [item.images];
        }

        // 2. Find existing fish by slug OR by nameVi
        let existing = await this.fishRepository.findOne({
          where: [{ slug: baseSlug }, { nameVi: rawNameVi }],
        });

        const fishData = {
          nameVi: rawNameVi,
          nameEn: item.nameEn ? String(item.nameEn).trim() : rawNameVi,
          scientificName: item.scientificName ? String(item.scientificName).trim() : '',
          categoryId: primaryCategory.id,
          images,
          sizeMin: parseNum(item.sizeMin),
          sizeMax: parseNum(item.sizeMax),
          lifespan: item.lifespan ? String(item.lifespan).trim() : '',
          difficulty,
          tempMin: parseNum(item.tempMin),
          tempMax: parseNum(item.tempMax),
          phMin: parseNum(item.phMin),
          phMax: parseNum(item.phMax),
          ghMin: parseNum(item.ghMin),
          ghMax: parseNum(item.ghMax),
          khMin: parseNum(item.khMin),
          khMax: parseNum(item.khMax),
          minTankSize: parseNum(item.minTankSize),
          swimLevel,
          temperament: item.temperament ? String(item.temperament).trim() : '',
          diet: item.diet ? String(item.diet).trim() : '',
          compatibleFish: item.compatibleFish ? String(item.compatibleFish).trim() : '',
          incompatibleFish: item.incompatibleFish ? String(item.incompatibleFish).trim() : '',
          commonDiseases: item.commonDiseases ? String(item.commonDiseases).trim() : '',
          description: item.description ? String(item.description).trim() : '',
          isPublished: item.isPublished !== undefined ? Boolean(item.isPublished) : true,
        };

        if (existing) {
          Object.assign(existing, fishData);
          await this.fishRepository.save(existing);
          updated++;
        } else {
          let uniqueSlug = baseSlug;
          let suffix = 1;
          while (await this.fishRepository.findOne({ where: { slug: uniqueSlug } })) {
            uniqueSlug = `${baseSlug}-${suffix++}`;
          }

          const newFish = this.fishRepository.create({
            ...fishData,
            slug: uniqueSlug,
          });
          await this.fishRepository.save(newFish);
          inserted++;
        }
      } catch (err) {
        console.error(`Lỗi khi import phần tử "${item?.nameVi}":`, err);
        errors++;
      }
    }

    return {
      success: true,
      totalProcessed: itemsInput.length,
      inserted,
      updated,
      errors,
    };
  }

  async remove(id: string) {
    await this.fishRepository.delete(id);
    return { success: true };
  }

  async removeCategory(id: string) {
    await this.categoryRepository.delete(id);
    return { success: true };
  }

  async removeBulk(ids?: string[], deleteAll?: boolean) {
    if (deleteAll) {
      await this.fishRepository.createQueryBuilder().delete().from(Fish).execute();
      return { success: true, message: 'Đã xóa toàn bộ sinh vật tra cứu trong cơ sở dữ liệu' };
    }
    if (ids && ids.length > 0) {
      await this.fishRepository.createQueryBuilder().delete().from(Fish).where('id IN (:...ids)', { ids }).execute();
      return { success: true, message: `Đã xóa ${ids.length} sinh vật tra cứu` };
    }
    return { success: false, message: 'Không có dữ liệu cần xóa' };
  }

  async createCategory(data: any): Promise<FishCategory> {
    const name = (data.name || data.title || '').trim();
    if (!name) {
      throw new ConflictException('Tên danh mục không được để trống');
    }

    const slug = data.slug ? createSlug(data.slug) : createSlug(name);
    let uniqueSlug = slug;
    let suffix = 1;
    while (await this.categoryRepository.findOne({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${suffix++}`;
    }

    const cat = this.categoryRepository.create({
      name,
      slug: uniqueSlug,
      description: data.description || '',
      icon: data.icon || '',
      order: Number(data.order) || 0,
    });
    return this.categoryRepository.save(cat);
  }

  async updateCategory(id: string, data: any): Promise<FishCategory> {
    const cat = await this.categoryRepository.findOne({ where: { id } });
    if (!cat) {
      throw new NotFoundException('Không tìm thấy danh mục này');
    }

    if (data.name && data.name !== cat.name) {
      cat.name = data.name.trim();
      const slug = createSlug(cat.name);
      let uniqueSlug = slug;
      let suffix = 1;
      while (await this.categoryRepository.findOne({ where: { slug: uniqueSlug } })) {
        const existing = await this.categoryRepository.findOne({ where: { slug: uniqueSlug } });
        if (existing && existing.id === id) break;
        uniqueSlug = `${slug}-${suffix++}`;
      }
      cat.slug = uniqueSlug;
    }

    if (data.description !== undefined) cat.description = data.description;
    if (data.icon !== undefined) cat.icon = data.icon;
    if (data.order !== undefined) cat.order = Number(data.order) || 0;

    return this.categoryRepository.save(cat);
  }

  async removeCategoriesBulk(ids?: string[], deleteAll?: boolean) {
    if (deleteAll) {
      await this.categoryRepository.createQueryBuilder().delete().from(FishCategory).execute();
      return { success: true, message: 'Đã xóa toàn bộ danh mục tra cứu' };
    }
    if (ids && ids.length > 0) {
      await this.categoryRepository.createQueryBuilder().delete().from(FishCategory).where('id IN (:...ids)', { ids }).execute();
      return { success: true, message: `Đã xóa ${ids.length} danh mục tra cứu` };
    }
    return { success: false, message: 'Không có dữ liệu cần xóa' };
  }

  async bulkUpdateCategories(ids: string[], data: { categoryId?: string; categoryIds?: string[]; categorySlugs?: string[] }) {
    if (!ids || ids.length === 0) {
      throw new NotFoundException('Vui lòng chọn ít nhất 1 mục để cập nhật');
    }

    const categoryIds = (data.categoryIds || []).filter(Boolean);
    const categorySlugs = (data.categorySlugs || []).filter(Boolean);
    const categoryId = data.categoryId || categoryIds[0] || undefined;

    const updatePayload: any = {};
    if (categoryId !== undefined) updatePayload.categoryId = categoryId;
    if (categoryIds.length > 0) updatePayload.categoryIds = categoryIds;
    if (categorySlugs.length > 0) updatePayload.categorySlugs = categorySlugs;

    await this.fishRepository.createQueryBuilder()
      .update(Fish)
      .set(updatePayload)
      .where('id IN (:...ids)', { ids })
      .execute();

    return { success: true, message: `Đã cập nhật danh mục cho ${ids.length} sinh vật` };
  }
}
