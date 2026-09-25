import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { AdPosition } from './entities/ad.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Public, Roles } from '../../common/decorators/public.decorator';
import { Role } from '../../common/enums/role.enum';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  // Public: Get active ads for display on website
  @Public()
  @Get('active')
  findActive(@Query('position') position?: AdPosition) {
    return this.adsService.findActiveByPosition(position);
  }

  // Public: Record ad impression
  @Public()
  @Post(':id/impression')
  trackImpression(@Param('id') id: string) {
    return this.adsService.trackImpression(id);
  }

  // Public: Record ad click
  @Public()
  @Post(':id/click')
  trackClick(@Param('id') id: string) {
    return this.adsService.trackClick(id);
  }

  // Admin / Public List (Admin gets all, public filter)
  @Get()
  findAll() {
    return this.adsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adsService.findOne(id);
  }

  // Admin protected endpoints
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createAdDto: CreateAdDto) {
    return this.adsService.create(createAdDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdDto: UpdateAdDto) {
    return this.adsService.update(id, updateAdDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id/toggle')
  toggleActive(@Param('id') id: string) {
    return this.adsService.toggleActive(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adsService.remove(id);
  }
}
