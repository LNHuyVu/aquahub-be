import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ad, AdPosition } from './entities/ad.entity';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(Ad)
    private readonly adRepository: Repository<Ad>,
  ) {}

  async findAll(): Promise<Ad[]> {
    return this.adRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findActiveByPosition(position?: AdPosition): Promise<Ad[]> {
    const whereClause: any = { isActive: true };
    if (position) {
      whereClause.position = position;
    }
    return this.adRepository.find({
      where: whereClause,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Ad> {
    const ad = await this.adRepository.findOne({ where: { id } });
    if (!ad) {
      throw new NotFoundException(`Quảng cáo với ID "${id}" không tồn tại.`);
    }
    return ad;
  }

  async create(createAdDto: CreateAdDto): Promise<Ad> {
    const ad = this.adRepository.create(createAdDto);
    return this.adRepository.save(ad);
  }

  async update(id: string, updateAdDto: UpdateAdDto): Promise<Ad> {
    const ad = await this.findOne(id);
    Object.assign(ad, updateAdDto);
    return this.adRepository.save(ad);
  }

  async toggleActive(id: string): Promise<Ad> {
    const ad = await this.findOne(id);
    ad.isActive = !ad.isActive;
    return this.adRepository.save(ad);
  }

  async remove(id: string): Promise<void> {
    const ad = await this.findOne(id);
    await this.adRepository.remove(ad);
  }

  async trackImpression(id: string): Promise<{ success: boolean; impressions: number }> {
    const ad = await this.findOne(id);
    ad.impressions = (ad.impressions || 0) + 1;
    await this.adRepository.save(ad);
    return { success: true, impressions: ad.impressions };
  }

  async trackClick(id: string): Promise<{ success: boolean; clicks: number; targetUrl: string }> {
    const ad = await this.findOne(id);
    ad.clicks = (ad.clicks || 0) + 1;
    await this.adRepository.save(ad);
    return { success: true, clicks: ad.clicks, targetUrl: ad.targetUrl };
  }
}
