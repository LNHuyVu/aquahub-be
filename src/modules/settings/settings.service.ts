import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  async getAll() {
    const settings = await this.settingRepository.find();
    const result: Record<string, string> = {
      heroBadge: 'Nền tảng sinh vật cảnh & Quản lý hồ cá #1 Việt Nam',
      heroTitle: 'Khám Phá Cá Cảnh &\nQuản Lý Hồ Cá Số',
      heroSubtitle: 'Tra cứu chuẩn xác thông số nước (pH, nhiệt độ), tập tính bơi, khả năng phối nuôi. Tạo nhật ký hồ cá số và kết nối cộng đồng thủy sinh năng động.',
      heroBannerImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      heroTankName: 'Hồ Thủy Sinh Iwagumi',
      heroOwnerName: 'Minh Thủy Sinh',
      heroTankVolume: '64.8',
      heroTemp: '25.5°C',
      heroPh: '6.8',
      heroFishCount: '24 con',
      statsFish: '500+',
      statsTanks: '1,200+',
      statsMembers: '3,400+',
      statsSupport: '99.8%',
    };

    settings.forEach((s) => {
      result[s.key] = s.value;
    });

    return result;
  }

  async updateAll(data: Record<string, string>) {
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        let setting = await this.settingRepository.findOne({ where: { key } });
        if (!setting) {
          setting = this.settingRepository.create({ key, value });
        } else {
          setting.value = value;
        }
        await this.settingRepository.save(setting);
      }
    }
    return this.getAll();
  }
}
