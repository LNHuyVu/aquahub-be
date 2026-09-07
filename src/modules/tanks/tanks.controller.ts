import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { TanksService } from './tanks.service';
import { CreateTankDto, AddTankFishDto, CreateTankLogDto } from './dto/tanks.dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('tanks')
@UseGuards(JwtAuthGuard)
export class TanksController {
  constructor(private readonly tanksService: TanksService) {}

  @Public()
  @Get()
  async getFeaturedTanks(@Query('limit') limit: number = 6) {
    return this.tanksService.getFeaturedTanks(limit);
  }

  @Get('my')
  async getMyTanks(@CurrentUser('id') userId: string) {
    return this.tanksService.getMyTanks(userId);
  }

  @Public()
  @Get(':id')
  async getTankById(@Param('id') id: string) {
    return this.tanksService.getTankById(id);
  }

  @Post()
  async createTank(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateTankDto,
  ) {
    return this.tanksService.createTank(userId, dto);
  }

  @Post(':id/fish')
  async addFishToTank(
    @CurrentUser('id') userId: string,
    @Param('id') tankId: string,
    @Body() dto: AddTankFishDto,
  ) {
    return this.tanksService.addFishToTank(userId, tankId, dto);
  }

  @Post(':id/logs')
  async addLogToTank(
    @CurrentUser('id') userId: string,
    @Param('id') tankId: string,
    @Body() dto: CreateTankLogDto,
  ) {
    return this.tanksService.addLogToTank(userId, tankId, dto);
  }
}
