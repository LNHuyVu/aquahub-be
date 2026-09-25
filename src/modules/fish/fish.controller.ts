import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { FishService } from './fish.service';
import { QueryFishDto, CreateFishDto } from './dto/fish.dto';
import { CreateReportDto } from '../posts/dto/posts.dto';
import { Public, Roles } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '../../common/enums/role.enum';

@Controller('fish')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FishController {
  constructor(private readonly fishService: FishService) { }

  @Post(':id/report')
  async reportFish(
    @CurrentUser('id') userId: string,
    @Param('id') fishId: string,
    @Body() dto: CreateReportDto,
  ) {
    return this.fishService.reportFish(userId, fishId, dto);
  }

  @Public()
  @Get()
  async findAll(@Query() query: QueryFishDto) {
    return this.fishService.findAll(query);
  }


  @Roles(Role.ADMIN, Role.MODERATOR)
  @Post('categories')
  async createCategory(@Body() body: any) {
    return this.fishService.createCategory(body);
  }

  @Roles(Role.ADMIN, Role.MODERATOR)
  @Patch('categories/:id')
  async updateCategory(@Param('id') id: string, @Body() body: any) {
    return this.fishService.updateCategory(id, body);
  }

  @Public()
  @Get('categories')
  async getCategories() {
    return this.fishService.getCategories();
  }

  @Public()
  @Get('compatibility')
  async checkCompatibility(
    @Query('fish1') fish1: string,
    @Query('fish2') fish2: string,
  ) {
    return this.fishService.checkCompatibility(fish1, fish2);
  }

  @Roles(Role.ADMIN, Role.MODERATOR)
  @Post('import')
  async importFish(@Body() body: { items?: any[] }) {
    return this.fishService.importFish(body.items);
  }

  @Roles(Role.ADMIN, Role.MODERATOR)
  @Patch('bulk-categories')
  async bulkUpdateCategories(@Body() body: { ids: string[]; categoryId?: string; categoryIds?: string[]; categorySlugs?: string[] }) {
    return this.fishService.bulkUpdateCategories(body.ids, body);
  }

  @Roles(Role.ADMIN)
  @Delete('categories/bulk')
  async removeCategoriesBulk(@Body() body: { ids?: string[]; deleteAll?: boolean }) {
    return this.fishService.removeCategoriesBulk(body.ids, body.deleteAll);
  }

  @Roles(Role.ADMIN)
  @Delete('categories/:id')
  async removeCategory(@Param('id') id: string) {
    return this.fishService.removeCategory(id);
  }

  @Public()
  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.fishService.findBySlug(slug);
  }

  @Roles(Role.ADMIN, Role.MODERATOR)
  @Post()
  async create(@Body() dto: CreateFishDto) {
    return this.fishService.create(dto);
  }

  @Roles(Role.ADMIN, Role.MODERATOR)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<CreateFishDto>) {
    return this.fishService.update(id, dto);
  }

  @Roles(Role.ADMIN)
  @Delete('bulk')
  async removeBulk(@Body() body: { ids?: string[]; deleteAll?: boolean }) {
    return this.fishService.removeBulk(body.ids, body.deleteAll);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.fishService.remove(id);
  }
}
