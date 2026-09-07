import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { ArticleCategory } from './entities/article-category.entity';
import { CreateArticleDto } from './dto/articles.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(ArticleCategory)
    private readonly categoryRepository: Repository<ArticleCategory>,
  ) {}

  async getCategories() {
    const categories = await this.categoryRepository.find({ order: { createdAt: 'ASC' } });
    if (categories.length === 0) {
      const defaults = [
        { name: 'Kỹ thuật nuôi & Làm nước', slug: 'ky-thuat-nuoi-lam-nuoc', description: 'Hướng dẫn chu trình vi sinh, lọc nước và xử lý nước bể cá' },
        { name: 'Bệnh cá & Điều trị', slug: 'benh-ca-dieu-tri', description: 'Triệu chứng nấm cá, thối vây, sình bụng và các bài thuốc trị hiệu quả' },
        { name: 'Dinh dưỡng & Thức ăn', slug: 'dinh-duong-thuc-an', description: 'Chế độ ăn phù hợp cho từng loại cá cảnh, cá săn mồi và cá thủy sinh' },
        { name: 'Thủy sinh & Bể kính', slug: 'thuy-sinh-be-kinh', description: 'Cách setup layout đá, cây thủy sinh, phân nền và đèn chiếu sáng' },
        { name: 'Kinh nghiệm chọn cá', slug: 'kinh-nghiem-chon-ca', description: 'Kinh nghiệm chọn cá khỏe mạnh, cá dưỡng sinh và phối nuôi an toàn' },
      ];
      for (const item of defaults) {
        const cat = this.categoryRepository.create(item);
        await this.categoryRepository.save(cat);
      }
      return this.categoryRepository.find({ order: { createdAt: 'ASC' } });
    }
    return categories;
  }

  async createCategory(name: string, description?: string) {
    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');

    const existing = await this.categoryRepository.findOne({ where: [{ name }, { slug }] });
    if (existing) {
      throw new ConflictException('Danh mục cẩm nang này đã tồn tại');
    }

    const cat = this.categoryRepository.create({ name, slug, description });
    return this.categoryRepository.save(cat);
  }

  async deleteCategory(id: string) {
    await this.categoryRepository.delete(id);
    return { success: true };
  }

  async findAll(page = 1, limit = 100, search?: string, category?: string) {
    const skip = (page - 1) * limit;
    const queryBuilder = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.author', 'author')
      .where('article.isPublished = :isPublished', { isPublished: true })
      .orderBy('article.publishedAt', 'DESC')
      .skip(skip)
      .take(limit);

    if (category && category.trim()) {
      queryBuilder.andWhere('article.category = :category', { category: category.trim() });
    }

    if (search && search.trim()) {
      queryBuilder.andWhere(
        '(LOWER(article.title) LIKE :search OR LOWER(article.excerpt) LIKE :search OR LOWER(article.content) LIKE :search)',
        { search: `%${search.trim().toLowerCase()}%` },
      );
    }

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async findBySlug(slug: string) {
    const article = await this.articleRepository.findOne({
      where: { slug, isPublished: true },
      relations: { author: true },
    });

    if (!article) {
      throw new NotFoundException('Bài viết không tồn tại');
    }

    article.viewsCount += 1;
    await this.articleRepository.save(article);

    return article;
  }

  async createArticle(userId: string, dto: CreateArticleDto) {
    const slug = dto.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');

    const existing = await this.articleRepository.findOne({ where: { slug } });
    if (existing) {
      throw new ConflictException('Tiêu đề bài viết này đã tồn tại');
    }

    const article = this.articleRepository.create({
      ...dto,
      slug,
      authorId: userId,
    });

    return this.articleRepository.save(article);
  }
}
