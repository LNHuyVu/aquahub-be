import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Setting } from './entities/setting.entity';
import { User } from '../users/entities/user.entity';
import { Fish, FishCategory } from '../fish/entities/fish.entity';
import { Article } from '../articles/entities/article.entity';
import { ArticleCategory } from '../articles/entities/article-category.entity';
import { Listing, ListingCategory } from '../listings/entities/listing.entity';
import { Post } from '../posts/entities/post.entity';
import { Question } from '../questions/entities/question.entity';
import { Tank } from '../tanks/entities/tank.entity';
import { Ad } from '../ads/entities/ad.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
    private readonly dataSource: DataSource,
  ) {}

  async getAdminStats() {
    const [
      usersCount,
      fishCount,
      fishCategoriesCount,
      articlesCount,
      articleCategoriesCount,
      listingsCount,
      listingCategoriesCount,
      postsCount,
      questionsCount,
      tanksCount,
      adsCount,
    ] = await Promise.all([
      this.dataSource.getRepository(User).count().catch(() => 0),
      this.dataSource.getRepository(Fish).count().catch(() => 0),
      this.dataSource.getRepository(FishCategory).count().catch(() => 0),
      this.dataSource.getRepository(Article).count().catch(() => 0),
      this.dataSource.getRepository(ArticleCategory).count().catch(() => 0),
      this.dataSource.getRepository(Listing).count().catch(() => 0),
      this.dataSource.getRepository(ListingCategory).count().catch(() => 0),
      this.dataSource.getRepository(Post).count().catch(() => 0),
      this.dataSource.getRepository(Question).count().catch(() => 0),
      this.dataSource.getRepository(Tank).count().catch(() => 0),
      this.dataSource.getRepository(Ad).count().catch(() => 0),
    ]);

    return {
      usersCount,
      fishCount,
      fishCategoriesCount,
      articlesCount,
      articleCategoriesCount,
      listingsCount,
      listingCategoriesCount,
      postsCount,
      questionsCount,
      tanksCount,
      adsCount,
    };
  }

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
