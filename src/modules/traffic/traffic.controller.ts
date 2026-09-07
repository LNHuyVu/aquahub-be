import { Controller, Get, Post, Body, Query, Req, UseGuards } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { RecordTrafficDto } from './dto/traffic.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

@Controller('traffic')
export class TrafficController {
  constructor(private readonly trafficService: TrafficService) {}

  // Public endpoint for frontend to ping page visits
  @Post('track')
  async trackVisit(@Body() dto: RecordTrafficDto, @Req() req: any) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || '';

    return this.trafficService.recordVisit({
      path: dto.path,
      ip: Array.isArray(ip) ? ip[0] : ip,
      userAgent,
      referrer: dto.referrer,
      userId: dto.userId,
    });
  }

  // Admin endpoint for Traffic Dashboard analytics
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('analytics')
  async getAnalytics(@Query('period') period: 'today' | '7days' | '30days' | 'all') {
    await this.trafficService.seedDemoTraffic();
    return this.trafficService.getOverviewStats(period || '7days');
  }
}
