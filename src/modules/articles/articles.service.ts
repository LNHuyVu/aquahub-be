import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { ArticleCategory } from './entities/article-category.entity';
import { Report, ReportTargetType } from '../posts/entities/post.entity';
import { CreateReportDto } from '../posts/dto/posts.dto';
import { CreateArticleDto } from './dto/articles.dto';
import { generate50Articles } from '../../database/generate-50-articles';

import { applyFuzzySearch } from '../../common/utils/fuzzy-search';
import { createSlug } from '../../common/utils/slug';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(ArticleCategory)
    private readonly categoryRepository: Repository<ArticleCategory>,
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) { }

  async reportArticle(userId: string, articleId: string, dto: CreateReportDto) {
    const article = await this.articleRepository.findOne({ where: { id: articleId } });
    if (!article) throw new NotFoundException('Bài viết cẩm nang không tồn tại');

    const report = this.reportRepository.create({
      reporterId: userId,
      articleId,
      targetType: ReportTargetType.ARTICLE,
      reason: dto.reason,
    });
    await this.reportRepository.save(report);
    return { success: true, message: 'Đã gửi báo cáo phản hồi cẩm nang thành công' };
  }


  async getCategories() {
    const categories = await this.categoryRepository.find({ order: { createdAt: 'ASC' } });
    if (categories.length === 0) {
      const defaults = [
        { name: 'Kỹ thuật nuôi & Làm nước', slug: createSlug('Kỹ thuật nuôi & Làm nước'), description: 'Hướng dẫn chu trình vi sinh, lọc nước và xử lý nước bể cá' },
        { name: 'Bệnh cá & Điều trị', slug: createSlug('Bệnh cá & Điều trị'), description: 'Triệu chứng nấm cá, thối vây, sình bụng và các bài thuốc trị hiệu quả' },
        { name: 'Dinh dưỡng & Thức ăn', slug: createSlug('Dinh dưỡng & Thức ăn'), description: 'Chế độ ăn phù hợp cho từng loại cá cảnh, cá săn mồi và cá thủy sinh' },
        { name: 'Thủy sinh & Bể kính', slug: createSlug('Thủy sinh & Bể kính'), description: 'Cách setup layout đá, cây thủy sinh, phân nền và đèn chiếu sáng' },
        { name: 'Kinh nghiệm chọn cá', slug: createSlug('Kinh nghiệm chọn cá'), description: 'Kinh nghiệm chọn cá khỏe mạnh, cá dưỡng sinh và phối nuôi an toàn' },
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
    const slug = createSlug(name, 'danh-muc');

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
      applyFuzzySearch(queryBuilder, search, [
        'article.title',
        'article.excerpt',
        'article.content',
      ]);
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

  async updateArticle(id: string, dto: Partial<CreateArticleDto>) {
    const article = await this.articleRepository.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException('Bài viết không tồn tại');
    }

    if (dto.title && dto.title !== article.title) {
      article.slug = createSlug(dto.title, 'bai-viet');
    }

    Object.assign(article, dto);
    return this.articleRepository.save(article);
  }

  async createArticle(userId: string, dto: CreateArticleDto) {
    const slug = createSlug(dto.title, 'bai-viet');

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

  async importArticles(userId: string, articlesInput?: any[], usePresetSystem: boolean = false) {
    let itemsToProcess = articlesInput;

    if (usePresetSystem || !itemsToProcess || itemsToProcess.length === 0) {
      itemsToProcess = generate50Articles();
    }

    let inserted = 0;
    let updated = 0;

    for (const art of itemsToProcess) {
      if (!art.title) continue;

      const slug = art.slug || createSlug(art.title, 'bai-viet');

      let existing = await this.articleRepository.findOne({ where: { slug } });

      if (existing) {
        existing.title = art.title;
        if (art.content) existing.content = art.content;
        if (art.excerpt) existing.excerpt = art.excerpt;
        if (art.coverImage) existing.coverImage = art.coverImage;
        if (art.category) existing.category = art.category;
        if (art.tags) existing.tags = Array.isArray(art.tags) ? art.tags : (art.tags ? [art.tags] : []);
        await this.articleRepository.save(existing);
        updated++;
      } else {
        const newArt = this.articleRepository.create({
          title: art.title,
          slug,
          excerpt: art.excerpt || '',
          content: art.content || `<p>${art.title}</p>`,
          coverImage: art.coverImage || 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800',
          category: art.category || 'Cẩm nang chung',
          tags: Array.isArray(art.tags) ? art.tags : (art.tags ? [art.tags] : ['Cẩm nang nuôi cá']),
          authorId: userId,
          isPublished: true,
          publishedAt: new Date(),
        });
        await this.articleRepository.save(newArt);
        inserted++;
      }
    }

    return {
      success: true,
      totalProcessed: itemsToProcess.length,
      inserted,
      updated,
      message: `Đã xử lý ${itemsToProcess.length} bài viết cẩm nang (Thêm mới: ${inserted}, Cập nhật: ${updated}).`,
    };
  }

  async remove(id: string) {
    await this.articleRepository.delete(id);
    return { success: true };
  }

  async removeBulk(ids?: string[], deleteAll?: boolean) {
    if (deleteAll) {
      await this.articleRepository.createQueryBuilder().delete().from(Article).execute();
      return { success: true, message: 'Đã xóa toàn bộ bài viết cẩm nang' };
    }
    if (ids && ids.length > 0) {
      await this.articleRepository.createQueryBuilder().delete().from(Article).where('id IN (:...ids)', { ids }).execute();
      return { success: true, message: `Đã xóa ${ids.length} bài viết cẩm nang` };
    }
    return { success: false, message: 'Không có dữ liệu cần xóa' };
  }

  async removeCategoriesBulk(ids?: string[], deleteAll?: boolean) {
    if (deleteAll) {
      await this.categoryRepository.createQueryBuilder().delete().from(ArticleCategory).execute();
      return { success: true, message: 'Đã xóa toàn bộ danh mục cẩm nang' };
    }
    if (ids && ids.length > 0) {
      await this.categoryRepository.createQueryBuilder().delete().from(ArticleCategory).where('id IN (:...ids)', { ids }).execute();
      return { success: true, message: `Đã xóa ${ids.length} danh mục cẩm nang` };
    }
    return { success: false, message: 'Không có dữ liệu cần xóa' };
  }
}
