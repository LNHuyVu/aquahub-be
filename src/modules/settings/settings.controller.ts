import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Public, Roles } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '../../common/enums/role.enum';

@Controller('settings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Public()
  @Get()
  async getAll() {
    return this.settingsService.getAll();
  }

  @Roles(Role.ADMIN)
  @Get('admin-stats')
  async getAdminStats() {
    return this.settingsService.getAdminStats();
  }

  @Roles(Role.ADMIN)
  @Post()
  async updateAll(@Body() body: Record<string, string>) {
    return this.settingsService.updateAll(body);
  }
}
