import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post, Comment, Like, Bookmark, Report } from './entities/post.entity';
import { QueryPostDto, CreatePostDto, CreateCommentDto, CreateReportDto } from './dto/posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  async getFeed(query: QueryPostDto, userId?: string) {
    const { page = 1, limit = 10, category } = query;
    const skip = (page - 1) * limit;

    const whereCondition: any = { isPublished: true };
    if (category && category !== 'Tất cả') {
      whereCondition.category = category;
    }

    const [items, total] = await this.postRepository.findAndCount({
      where: whereCondition,
      relations: { author: true },
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

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

    const postsWithState = items.map((post) => ({
      ...post,
      isLiked: likedPostIds.has(post.id),
      isBookmarked: bookmarkedPostIds.has(post.id),
    }));

    return {
      items: postsWithState,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getPostById(id: string, userId?: string) {
    const post = await this.postRepository.findOne({
      where: { id, isPublished: true },
      relations: { author: true },
    });

    if (!post) {
      throw new NotFoundException('Bài viết không tồn tại');
    }

    let isLiked = false;
    let isBookmarked = false;

    if (userId) {
      const like = await this.likeRepository.findOne({ where: { userId, postId: id } });
      isLiked = !!like;

      const bookmark = await this.bookmarkRepository.findOne({ where: { userId, postId: id } });
      isBookmarked = !!bookmark;
    }

    return {
      ...post,
      isLiked,
      isBookmarked,
    };
  }

  async createPost(userId: string, dto: CreatePostDto) {
    const post = this.postRepository.create({
      ...dto,
      authorId: userId,
    });
    return this.postRepository.save(post);
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
    const report = this.reportRepository.create({
      reporterId: userId,
      postId,
      reason: dto.reason,
    });
    return this.reportRepository.save(report);
  }
}
