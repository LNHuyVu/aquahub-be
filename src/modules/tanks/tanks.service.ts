import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tank, TankFish, TankLog } from './entities/tank.entity';
import { CreateTankDto, AddTankFishDto, CreateTankLogDto } from './dto/tanks.dto';

import { applyFuzzySearch } from '../../common/utils/fuzzy-search';

@Injectable()
export class TanksService {
  constructor(
    @InjectRepository(Tank)
    private readonly tankRepository: Repository<Tank>,
    @InjectRepository(TankFish)
    private readonly tankFishRepository: Repository<TankFish>,
    @InjectRepository(TankLog)
    private readonly tankLogRepository: Repository<TankLog>,
  ) {}

  async getFeaturedTanks(limit = 100, search?: string) {
    const qb = this.tankRepository
      .createQueryBuilder('tank')
      .leftJoinAndSelect('tank.owner', 'owner')
      .where('tank.isPublic = :isPublic', { isPublic: true });

    if (search) {
      applyFuzzySearch(qb, search, [
        'tank.name',
        'tank.description',
        'tank.waterType',
        'owner.displayName',
        'owner.username',
      ]);
    }

    return qb.orderBy('tank.createdAt', 'DESC').take(limit).getMany();
  }

  async getMyTanks(userId: string) {
    return this.tankRepository.find({
      where: { ownerId: userId },
      relations: { owner: true },
      order: { createdAt: 'DESC' },
    });
  }

  async getTankById(id: string) {
    const tank = await this.tankRepository.findOne({
      where: { id },
      relations: { owner: true },
    });

    if (!tank) {
      throw new NotFoundException('Không tìm thấy hồ cá này');
    }

    const fishList = await this.tankFishRepository.find({
      where: { tankId: id },
      relations: { fish: true },
    });

    const logs = await this.tankLogRepository.find({
      where: { tankId: id },
      order: { createdAt: 'DESC' },
    });

    return {
      ...tank,
      fishList,
      logs,
    };
  }

  async createTank(userId: string, dto: CreateTankDto) {
    let volume = dto.length && dto.width && dto.height
      ? (dto.length * dto.width * dto.height) / 1000
      : undefined;

    const tank = this.tankRepository.create({
      ...dto,
      volume,
      ownerId: userId,
    });

    return this.tankRepository.save(tank);
  }

  async addFishToTank(userId: string, tankId: string, dto: AddTankFishDto) {
    const tank = await this.tankRepository.findOne({ where: { id: tankId } });
    if (!tank) throw new NotFoundException('Hồ cá không tồn tại');
    if (tank.ownerId !== userId) throw new ForbiddenException('Bạn không phải chủ sở hữu hồ cá này');

    const tankFish = this.tankFishRepository.create({
      tankId,
      fishId: dto.fishId,
      quantity: dto.quantity || 1,
    });

    return this.tankFishRepository.save(tankFish);
  }

  async addLogToTank(userId: string, tankId: string, dto: CreateTankLogDto) {
    const tank = await this.tankRepository.findOne({ where: { id: tankId } });
    if (!tank) throw new NotFoundException('Hồ cá không tồn tại');
    if (tank.ownerId !== userId) throw new ForbiddenException('Bạn không phải chủ sở hữu hồ cá này');

    const log = this.tankLogRepository.create({
      tankId,
      ...dto,
    });

    return this.tankLogRepository.save(log);
  }

  async updateTank(userId: string, tankId: string, dto: any) {
    const tank = await this.tankRepository.findOne({ where: { id: tankId } });
    if (!tank) throw new NotFoundException('Hồ cá không tồn tại');
    if (tank.ownerId !== userId) throw new ForbiddenException('Bạn không có quyền chỉnh sửa hồ cá này');

    let volume = tank.volume;
    const length = dto.length ?? tank.length;
    const width = dto.width ?? tank.width;
    const height = dto.height ?? tank.height;

    if (length && width && height) {
      volume = (length * width * height) / 1000;
    }

    Object.assign(tank, { ...dto, volume });
    return this.tankRepository.save(tank);
  }

  async deleteTank(userId: string, tankId: string) {
    const tank = await this.tankRepository.findOne({ where: { id: tankId } });
    if (!tank) throw new NotFoundException('Hồ cá không tồn tại');
    if (tank.ownerId !== userId) throw new ForbiddenException('Bạn không có quyền xóa hồ cá này');

    await this.tankRepository.remove(tank);
    return { success: true, message: 'Đã xóa hồ cá thành công' };
  }
}
