import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { FishService } from './fish.service';
import { QueryFishDto, CreateFishDto } from './dto/fish.dto';
import { Public, Roles } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '../../common/enums/role.enum';

@Controller('fish')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FishController {
  constructor(private readonly fishService: FishService) {}

  @Public()
  @Get()
  async findAll(@Query() query: QueryFishDto) {
    return this.fishService.findAll(query);
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
}
