import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tank, TankFish, TankLog } from './entities/tank.entity';
import { TanksService } from './tanks.service';
import { TanksController } from './tanks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tank, TankFish, TankLog])],
  controllers: [TanksController],
  providers: [TanksService],
  exports: [TanksService],
})
export class TanksModule {}
