import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { QueryPostDto, CreatePostDto, CreateCommentDto, CreateReportDto } from './dto/posts.dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Public()
  @Get()
  async getFeed(
    @Query() query: QueryPostDto,
    @CurrentUser('id') userId?: string,
  ) {
    return this.postsService.getFeed(query, userId);
  }

  @Public()
  @Get(':id')
  async getPostById(
    @Param('id') id: string,
    @CurrentUser('id') userId?: string,
  ) {
    return this.postsService.getPostById(id, userId);
  }

  @Post()
  async createPost(
    @CurrentUser('id') userId: string,
    @Body() dto: CreatePostDto,
  ) {
    return this.postsService.createPost(userId, dto);
  }

  @Post(':id/like')
  async toggleLike(
    @CurrentUser('id') userId: string,
    @Param('id') postId: string,
  ) {
    return this.postsService.toggleLike(userId, postId);
  }

  @Post(':id/bookmark')
  async toggleBookmark(
    @CurrentUser('id') userId: string,
    @Param('id') postId: string,
  ) {
    return this.postsService.toggleBookmark(userId, postId);
  }

  @Public()
  @Get(':id/comments')
  async getComments(@Param('id') postId: string) {
    return this.postsService.getComments(postId);
  }

  @Post(':id/comments')
  async addComment(
    @CurrentUser('id') userId: string,
    @Param('id') postId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.postsService.addComment(userId, postId, dto);
  }

  @Post(':id/report')
  async reportPost(
    @CurrentUser('id') userId: string,
    @Param('id') postId: string,
    @Body() dto: CreateReportDto,
  ) {
    return this.postsService.reportPost(userId, postId, dto);
  }
}
