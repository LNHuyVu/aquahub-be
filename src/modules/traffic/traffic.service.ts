import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual } from 'typeorm';
import { TrafficLog } from './entities/traffic-log.entity';

@Injectable()
export class TrafficService {
  constructor(
    @InjectRepository(TrafficLog)
    private readonly trafficRepo: Repository<TrafficLog>,
  ) {}

  async recordVisit(reqData: {
    path: string;
    ip?: string;
    userAgent?: string;
    referrer?: string;
    userId?: string;
  }) {
    // Determine device type
    const ua = (reqData.userAgent || '').toLowerCase();
    let device = 'DESKTOP';
    if (/mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
      device = /ipad|tablet/i.test(ua) ? 'TABLET' : 'MOBILE';
    }

    // Determine browser
    let browser = 'Other';
    if (ua.includes('firefox')) browser = 'Firefox';
    else if (ua.includes('edg')) browser = 'Edge';
    else if (ua.includes('chrome')) browser = 'Chrome';
    else if (ua.includes('safari')) browser = 'Safari';

    const log = this.trafficRepo.create({
      path: reqData.path || '/',
      method: 'GET',
      ip: reqData.ip || '127.0.0.1',
      userAgent: reqData.userAgent || '',
      device,
      browser,
      referrer: reqData.referrer || 'Direct',
      userId: reqData.userId || null,
    });

    return this.trafficRepo.save(log);
  }

  async getOverviewStats(period: 'today' | '7days' | '30days' | 'all' = '7days') {
    const now = new Date();
    let startDate = new Date(0);

    if (period === 'today') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (period === '7days') {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (period === '30days') {
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    const totalPageviews = await this.trafficRepo.count({
      where: period !== 'all' ? { createdAt: MoreThanOrEqual(startDate) } : {},
    });

    // Unique IPs (unique visitors)
    const uniqueVisitorsResult = await this.trafficRepo
      .createQueryBuilder('traffic')
      .select('COUNT(DISTINCT traffic.ip)', 'count')
      .where(period !== 'all' ? 'traffic.createdAt >= :startDate' : '1=1', { startDate })
      .getRawOne();

    const uniqueVisitors = parseInt(uniqueVisitorsResult?.count || '0', 10);

    // Top visited paths
    const topPages = await this.trafficRepo
      .createQueryBuilder('traffic')
      .select('traffic.path', 'path')
      .addSelect('COUNT(*)', 'views')
      .where(period !== 'all' ? 'traffic.createdAt >= :startDate' : '1=1', { startDate })
      .groupBy('traffic.path')
      .orderBy('views', 'DESC')
      .limit(8)
      .getRawMany();

    // Device Breakdown
    const devicesRaw = await this.trafficRepo
      .createQueryBuilder('traffic')
      .select('traffic.device', 'device')
      .addSelect('COUNT(*)', 'count')
      .where(period !== 'all' ? 'traffic.createdAt >= :startDate' : '1=1', { startDate })
      .groupBy('traffic.device')
      .getRawMany();

    // Browser Breakdown
    const browsersRaw = await this.trafficRepo
      .createQueryBuilder('traffic')
      .select('traffic.browser', 'browser')
      .addSelect('COUNT(*)', 'count')
      .where(period !== 'all' ? 'traffic.createdAt >= :startDate' : '1=1', { startDate })
      .groupBy('traffic.browser')
      .getRawMany();

    // Recent 10 traffic logs
    const recentLogs = await this.trafficRepo.find({
      order: { createdAt: 'DESC' },
      take: 10,
    });

    return {
      period,
      totalPageviews,
      uniqueVisitors,
      topPages: topPages.map((p) => ({ path: p.path, views: parseInt(p.views, 10) })),
      deviceBreakdown: devicesRaw.map((d) => ({ device: d.device, count: parseInt(d.count, 10) })),
      browserBreakdown: browsersRaw.map((b) => ({ browser: b.browser, count: parseInt(b.count, 10) })),
      recentLogs,
    };
  }

  // Seed sample traffic for demo dashboard visualization
  async seedDemoTraffic() {
    const samplePaths = [
      '/',
      '/ca-canh',
      '/cho-thuy-sinh',
      '/cam-nang',
      '/cong-dong',
      '/hoi-dap',
      '/ho-ca',
      '/cong-cu',
      '/lien-he',
      '/ca-canh/ca-neon-vua',
      '/cam-nang/ky-thuat-cycle-be-ca-moi-tao-he-vi-sinh-chuan-chi-sau-7-ngay-1',
    ];

    const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
    const devices = ['DESKTOP', 'MOBILE', 'TABLET'];
    const ips = ['113.161.42.10', '14.226.12.88', '27.72.101.4', '118.69.18.99', '171.244.3.15', '42.115.89.20'];

    const count = await this.trafficRepo.count();
    if (count > 20) return; // already seeded

    const now = new Date();
    const logs = [];

    for (let i = 0; i < 250; i++) {
      const path = samplePaths[Math.floor(Math.random() * samplePaths.length)];
      const device = devices[Math.floor(Math.random() * devices.length)];
      const browser = browsers[Math.floor(Math.random() * browsers.length)];
      const ip = ips[Math.floor(Math.random() * ips.length)];
      const daysAgo = Math.floor(Math.random() * 7);
      const hoursAgo = Math.floor(Math.random() * 24);

      const createdAt = new Date(now.getTime() - (daysAgo * 24 + hoursAgo) * 3600 * 1000);

      logs.push(
        this.trafficRepo.create({
          path,
          method: 'GET',
          ip,
          userAgent: `Mozilla/5.0 (${device}) ${browser}`,
          device,
          browser,
          referrer: Math.random() > 0.4 ? 'https://google.com' : 'Direct',
          createdAt,
        }),
      );
    }

    await this.trafficRepo.save(logs);
  }
}
