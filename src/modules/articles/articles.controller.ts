import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/articles.dto';
import { Public, Roles } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '../../common/enums/role.enum';

@Controller('articles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Public()
  @Get('categories')
  async getCategories() {
    return this.articlesService.getCategories();
  }

  @Roles(Role.ADMIN, Role.MODERATOR)
  @Post('categories')
  async createCategory(@Body() body: { name: string; description?: string }) {
    return this.articlesService.createCategory(body.name, body.description);
  }

  @Roles(Role.ADMIN)
  @Delete('categories/:id')
  async deleteCategory(@Param('id') id: string) {
    return this.articlesService.deleteCategory(id);
  }

  @Public()
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 100,
    @Query('search') search?: string,
    @Query('category') category?: string,
  ) {
    return this.articlesService.findAll(page, limit, search, category);
  }

  @Public()
  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    if (slug === 'categories') {
      return this.articlesService.getCategories();
    }
    return this.articlesService.findBySlug(slug);
  }

  @Roles(Role.ADMIN, Role.MODERATOR)
  @Post()
  async createArticle(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateArticleDto,
  ) {
    return this.articlesService.createArticle(userId, dto);
  }
}
