import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fish, FishCategory } from './entities/fish.entity';
import { FishService } from './fish.service';
import { FishController } from './fish.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Fish, FishCategory])],
  controllers: [FishController],
  providers: [FishService],
  exports: [FishService],
})
export class FishModule {}
