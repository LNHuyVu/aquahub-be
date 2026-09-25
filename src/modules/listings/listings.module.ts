import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import {
  Listing,
  ListingCategory,
  ListingComment,
  ListingLike,
  ListingReport,
} from './entities/listing.entity';
import { FishCategory } from '../fish/entities/fish.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Listing,
      ListingCategory,
      ListingComment,
      ListingLike,
      ListingReport,
      FishCategory,
    ]),
  ],
  controllers: [ListingsController],
  providers: [ListingsService],
  exports: [ListingsService],
})
export class ListingsModule {}
