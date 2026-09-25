import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fish, FishCategory } from './entities/fish.entity';
import { Report } from '../posts/entities/post.entity';
import { FishService } from './fish.service';
import { FishController } from './fish.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Fish, FishCategory, Report])],
  controllers: [FishController],
  providers: [FishService],
  exports: [FishService],
})
export class FishModule {}

