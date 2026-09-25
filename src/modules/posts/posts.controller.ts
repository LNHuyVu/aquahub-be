import { Controller, Get, Post, Put, Patch, Body, Param, Query, UseGuards, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  QueryPostDto,
  CreatePostDto,
  UpdatePostDto,
  CreatePostCategoryDto,
  UpdatePostCategoryDto,
  CreateCommentDto,
  CreateReportDto,
  AdminBoostLikesDto,
} from './dto/posts.dto';
import { Public, Roles } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Public()
  @Get('categories')
  async getCategories() {
    return this.postsService.getCategories();
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('categories')
  async createCategory(@Body() dto: CreatePostCategoryDto) {
    return this.postsService.createCategory(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put('categories/:id')
  async updateCategory(@Param('id') id: string, @Body() dto: UpdatePostCategoryDto) {
    return this.postsService.updateCategory(id, dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('categories/:id')
  async deleteCategory(@Param('id') id: string) {
    return this.postsService.deleteCategory(id);
  }

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

  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') userRole: string,
    @Body() dto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(id, userId, userRole, dto);
  }

  @Put(':id/toggle-status')
  async toggleStatus(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') userRole: string,
  ) {
    return this.postsService.toggleStatus(id, userId, userRole);
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

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post(':id/boost-likes')
  async boostLikes(
    @Param('id') postId: string,
    @Body() dto: AdminBoostLikesDto,
  ) {
    return this.postsService.boostLikes(postId, dto.count);
  }

  @Delete(':id')
  async deletePost(
    @CurrentUser('id') userId: string,
    @CurrentUser('role') userRole: string,
    @Param('id') id: string,
  ) {
    return this.postsService.deletePost(userId, userRole, id);
  }
}
