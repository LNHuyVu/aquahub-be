import { Injectable, NotFoundException, ForbiddenException, BadRequestException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Post, PostCategory, Comment, Like, Bookmark, Report } from './entities/post.entity';
import { QueryPostDto, CreatePostDto, UpdatePostDto, CreatePostCategoryDto, UpdatePostCategoryDto, CreateCommentDto, CreateReportDto } from './dto/posts.dto';
import { applyFuzzySearch } from '../../common/utils/fuzzy-search';

import { createSlug } from '../../common/utils/slug';

const DEFAULT_POST_CATEGORIES = [
  { name: '🐟 Cá cảnh', slug: createSlug('Cá cảnh'), icon: '🐟', order: 1 },
  { name: '🌱 Thủy sinh', slug: createSlug('Thủy sinh'), icon: '🌱', order: 2 },
  { name: '💧 Nước & Vi sinh', slug: createSlug('Nước & Vi sinh'), icon: '💧', order: 3 },
  { name: '🦠 Bệnh & Chăm sóc', slug: createSlug('Bệnh & Chăm sóc'), icon: '🦠', order: 4 },
  { name: '🍤 Thức ăn', slug: createSlug('Thức ăn'), icon: '🍤', order: 5 },
  { name: '🧰 Thiết bị', slug: createSlug('Thiết bị'), icon: '🧰', order: 6 },
  { name: '🐣 Sinh sản', slug: createSlug('Sinh sản'), icon: '🐣', order: 7 },
  { name: '🦐 Tép & Sinh vật', slug: createSlug('Tép & Sinh vật'), icon: '🦐', order: 8 },
  { name: '💰 Mua bán', slug: createSlug('Mua bán'), icon: '💰', order: 9 },
];

@Injectable()
export class PostsService implements OnModuleInit {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostCategory)
    private readonly categoryRepository: Repository<PostCategory>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  async onModuleInit() {
    await this.ensureDefaultCategories();
  }

  async ensureDefaultCategories() {
    const count = await this.categoryRepository.count();
    if (count === 0) {
      for (const cat of DEFAULT_POST_CATEGORIES) {
        await this.categoryRepository.save(this.categoryRepository.create(cat));
      }
    }

    const categories = await this.categoryRepository.find({ order: { order: 'ASC' } });
    if (categories.length > 0) {
      const unassignedPosts = await this.postRepository.find({ where: { categoryId: IsNull() } });
      for (let i = 0; i < unassignedPosts.length; i++) {
        const post = unassignedPosts[i];
        const assignedCat = categories[i % categories.length];
        const title = post.title || post.content.slice(0, 60);
        const baseSlug = createSlug(title, 'bai-viet');
        const slug = post.slug || `${baseSlug}-${post.id.slice(0, 6)}`;
        await this.postRepository.update({ id: post.id }, { categoryId: assignedCat.id, title, slug });
      }
    }
  }

  async getCategories() {
    await this.ensureDefaultCategories();
    return this.categoryRepository.find({
      order: { order: 'ASC', createdAt: 'ASC' },
    });
  }

  async createCategory(dto: CreatePostCategoryDto) {
    const slug = createSlug(dto.name);
    const existing = await this.categoryRepository.findOne({ where: { slug } });
    if (existing) {
      throw new BadRequestException('Danh mục này đã tồn tại');
    }
    const cat = this.categoryRepository.create({
      ...dto,
      slug,
    });
    return this.categoryRepository.save(cat);
  }

  async updateCategory(id: string, dto: UpdatePostCategoryDto) {
    const cat = await this.categoryRepository.findOne({ where: { id } });
    if (!cat) throw new NotFoundException('Danh mục không tồn tại');

    if (dto.name && dto.name !== cat.name) {
      cat.slug = createSlug(dto.name);
    }
    Object.assign(cat, dto);
    return this.categoryRepository.save(cat);
  }

  async deleteCategory(id: string) {
    const cat = await this.categoryRepository.findOne({ where: { id } });
    if (!cat) throw new NotFoundException('Danh mục không tồn tại');
    await this.categoryRepository.remove(cat);
    return { success: true, message: 'Đã xóa danh mục bài viết' };
  }

  async getFeed(query: QueryPostDto, userId?: string) {
    try {
      const { page = 1, limit = 24, categoryId, categorySlug, category, search } = query;
      const skip = (page - 1) * limit;

    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.category', 'category')
      .where('post.isPublished = :isPublished', { isPublished: true });

    if (query.authorId) {
      queryBuilder.andWhere('post.authorId = :authorId', { authorId: query.authorId });
    }

    if (categoryId) {
      queryBuilder.andWhere('post.categoryId = :categoryId', { categoryId });
    } else if (categorySlug && categorySlug !== 'tat-ca') {

      queryBuilder.andWhere('category.slug = :categorySlug', { categorySlug });
    } else if (category && category !== 'Tất cả') {
      const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(category);
      if (isUuid) {
        queryBuilder.andWhere('post.categoryId = :category', { category });
      } else {
        queryBuilder.andWhere('(category.name = :category OR category.slug = :category)', { category });
      }
    }

    if (search) {
      applyFuzzySearch(queryBuilder, search, ['post.title', 'post.content', 'author.displayName', 'author.username']);
    }

    queryBuilder
      .orderBy('post.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    const [items, total] = await queryBuilder.getManyAndCount();

    const defaultCat = await this.categoryRepository.findOne({ where: {}, order: { order: 'ASC' } });

    let likedPostIds = new Set<string>();
    let bookmarkedPostIds = new Set<string>();

    if (userId && items.length > 0) {
      const postIds = items.map((p) => p.id);
      
      const likes = await this.likeRepository
        .createQueryBuilder('like')
        .where('like.userId = :userId AND like.postId IN (:...postIds)', { userId, postIds })
        .getMany();
      likedPostIds = new Set(likes.map((l) => l.postId!));

      const bookmarks = await this.bookmarkRepository
        .createQueryBuilder('bookmark')
        .where('bookmark.userId = :userId AND bookmark.postId IN (:...postIds)', { userId, postIds })
        .getMany();
      bookmarkedPostIds = new Set(bookmarks.map((b) => b.postId));
    }

    const postsWithState = items.map((post) => {
      const title = post.title || (post.content ? post.content.slice(0, 60) : 'Bài viết mới');
      const slug = post.slug || `${createSlug(title, 'bai-viet')}-${post.id.slice(0, 6)}`;
      const category = post.category || defaultCat;
      return {
        ...post,
        title,
        slug,
        category,
        isLiked: likedPostIds.has(post.id),
        isBookmarked: bookmarkedPostIds.has(post.id),
      };
    });

    return {
      items: postsWithState,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
    } catch (error) {
      console.error('🔥 Error in getFeed:', error);
      throw error;
    }
  }

  async getPostById(param: string, userId?: string) {
    const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(param);
    const whereConditions: any[] = [{ slug: param, isPublished: true }];
    if (isUuid) {
      whereConditions.push({ id: param, isPublished: true });
    }

    let post = await this.postRepository.findOne({
      where: whereConditions,
      relations: { author: true, category: true },
    });

    if (!post) {
      throw new NotFoundException('Bài viết không tồn tại');
    }

    if (!post.slug || !post.categoryId) {
      const defaultCat = await this.categoryRepository.findOne({ where: {}, order: { order: 'ASC' } });
      if (!post.slug) {
        const base = createSlug(post.title || post.content.slice(0, 50), 'bai-viet');
        post.slug = `${base}-${post.id.slice(0, 6)}`;
      }
      if (!post.categoryId && defaultCat) {
        post.categoryId = defaultCat.id;
        post.category = defaultCat;
      }
      await this.postRepository.update({ id: post.id }, { slug: post.slug, categoryId: post.categoryId });
    }

    let isLiked = false;
    let isBookmarked = false;

    if (userId) {
      const like = await this.likeRepository.findOne({ where: { userId, postId: post.id } });
      isLiked = !!like;

      const bookmark = await this.bookmarkRepository.findOne({ where: { userId, postId: post.id } });
      isBookmarked = !!bookmark;
    }

    return {
      ...post,
      isLiked,
      isBookmarked,
    };
  }

  async createPost(userId: string, dto: CreatePostDto) {
    const title = dto.title.trim();
    const baseSlug = createSlug(title, 'bai-viet');
    const slug = `${baseSlug}-${Date.now().toString().slice(-6)}`;

    let categoryId = dto.categoryId;
    if (!categoryId && dto.category) {
      const foundCat = await this.categoryRepository.findOne({
        where: [{ id: dto.category }, { slug: dto.category }, { name: dto.category }],
      });
      if (foundCat) categoryId = foundCat.id;
    }

    if (!categoryId) {
      const defaultCat = await this.categoryRepository.findOne({ order: { order: 'ASC' } });
      if (defaultCat) categoryId = defaultCat.id;
    }

    const post = this.postRepository.create({
      title,
      content: dto.content,
      images: dto.images,
      categoryId,
      slug,
      authorId: userId,
    });
    const saved = await this.postRepository.save(post);
    return this.getPostById(saved.id, userId);
  }

  async updatePost(id: string, userId: string, userRole: string, dto: UpdatePostDto) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Bài viết không tồn tại');

    if (post.authorId !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenException('Bạn không có quyền chỉnh sửa bài viết này');
    }

    if (dto.title && dto.title !== post.title) {
      const baseSlug = createSlug(dto.title, 'bai-viet');
      post.slug = `${baseSlug}-${id.slice(0, 6)}`;
    }

    if (dto.categoryId) post.categoryId = dto.categoryId;
    if (dto.title !== undefined) post.title = dto.title;
    if (dto.content !== undefined) post.content = dto.content;
    if (dto.images !== undefined) post.images = dto.images;
    if (dto.isPublished !== undefined) post.isPublished = dto.isPublished;

    await this.postRepository.save(post);
    return this.getPostById(id, userId);
  }

  async toggleStatus(id: string, userId: string, userRole: string) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Bài viết không tồn tại');

    if (post.authorId !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenException('Bạn không có quyền đổi trạng thái bài viết này');
    }

    post.isPublished = !post.isPublished;
    await this.postRepository.save(post);
    return { success: true, isPublished: post.isPublished, message: post.isPublished ? 'Đã hiện bài viết' : 'Đã ẩn bài viết' };
  }

  async toggleLike(userId: string, postId: string) {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) throw new NotFoundException('Bài viết không tồn tại');

    const existing = await this.likeRepository.findOne({ where: { userId, postId } });

    if (existing) {
      await this.likeRepository.remove(existing);
      post.likesCount = Math.max(0, post.likesCount - 1);
      await this.postRepository.save(post);
      return { isLiked: false, likesCount: post.likesCount };
    } else {
      const like = this.likeRepository.create({ userId, postId });
      await this.likeRepository.save(like);
      post.likesCount += 1;
      await this.postRepository.save(post);
      return { isLiked: true, likesCount: post.likesCount };
    }
  }

  async toggleBookmark(userId: string, postId: string) {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) throw new NotFoundException('Bài viết không tồn tại');

    const existing = await this.bookmarkRepository.findOne({ where: { userId, postId } });

    if (existing) {
      await this.bookmarkRepository.remove(existing);
      return { isBookmarked: false };
    } else {
      const bookmark = this.bookmarkRepository.create({ userId, postId });
      await this.bookmarkRepository.save(bookmark);
      return { isBookmarked: true };
    }
  }

  async getComments(postId: string) {
    return this.commentRepository.find({
      where: { postId },
      relations: { author: true },
      order: { createdAt: 'ASC' },
    });
  }

  async addComment(userId: string, postId: string, dto: CreateCommentDto) {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) throw new NotFoundException('Bài viết không tồn tại');

    const comment = this.commentRepository.create({
      ...dto,
      postId,
      authorId: userId,
    });
    const saved = await this.commentRepository.save(comment);

    post.commentsCount += 1;
    await this.postRepository.save(post);

    return this.commentRepository.findOne({
      where: { id: saved.id },
      relations: { author: true },
    });
  }

  async reportPost(userId: string, postId: string, dto: CreateReportDto) {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) throw new NotFoundException('Bài viết không tồn tại');

    const report = this.reportRepository.create({
      reporterId: userId,
      postId,
      targetType: 'POST',
      reason: dto.reason,
    });
    await this.reportRepository.save(report);
    return { success: true, message: 'Đã gửi báo cáo vi phạm bài viết thành công' };
  }


  async boostLikes(postId: string, count: number) {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) throw new NotFoundException('Bài viết không tồn tại');

    // Get system managed bot users
    const botUsers = await this.postRepository.manager.getRepository('User').find({
      where: { isSystemManaged: true },
    });

    if (botUsers.length === 0) {
      // Fallback: get any users
      const allUsers = await this.postRepository.manager.getRepository('User').find({ take: 100 });
      botUsers.push(...allUsers);
    }

    // Get existing likes on this post
    const existingLikes = await this.likeRepository.find({ where: { postId } });
    const existingUserIds = new Set(existingLikes.map((l) => l.userId));

    // Filter available bot users who haven't liked this post yet
    const availableBots = botUsers.filter((b) => !existingUserIds.has(b.id));

    if (availableBots.length === 0) {
      return {
        message: 'Tất cả các tài khoản bot đều đã thả tim bài viết này.',
        likesCount: post.likesCount,
        addedLikes: 0,
      };
    }

    // Shuffle available bots
    const shuffled = availableBots.sort(() => 0.5 - Math.random());
    const selectedBots = shuffled.slice(0, count);

    const newLikes = selectedBots.map((bot) =>
      this.likeRepository.create({
        postId,
        userId: bot.id,
      }),
    );

    await this.likeRepository.save(newLikes);

    post.likesCount += newLikes.length;
    await this.postRepository.save(post);

    return {
      message: `Đã tăng thành công ${newLikes.length} lượt thích từ các tài khoản hệ thống!`,
      likesCount: post.likesCount,
      addedLikes: newLikes.length,
    };
  }

  async deletePost(userId: string, userRole: string, postId: string) {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) throw new NotFoundException('Bài viết không tồn tại');

    if (post.authorId !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenException('Bạn không có quyền xóa bài viết này');
    }

    // Delete associated comments, likes, bookmarks, reports
    await this.commentRepository.delete({ postId });
    await this.likeRepository.delete({ postId });
    await this.bookmarkRepository.delete({ postId });
    await this.reportRepository.delete({ postId });
    await this.postRepository.remove(post);

    return { success: true, message: 'Đã xóa bài viết thành công' };
  }
}
