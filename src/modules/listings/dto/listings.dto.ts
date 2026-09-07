import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsArray,
  Min,
} from 'class-validator';
import { ListingStatus, ListingCondition, PriceType } from '../entities/listing.entity';

export class CreateListingCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsNumber()
  @IsOptional()
  order?: number;
}

export class UpdateListingCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsNumber()
  @IsOptional()
  order?: number;
}

export class CreateListingDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsEnum(PriceType)
  @IsOptional()
  priceType?: PriceType;

  @IsEnum(ListingCondition)
  @IsOptional()
  condition?: ListingCondition;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  videoUrl?: string;

  @IsString()
  @IsNotEmpty()
  contactName: string;

  @IsString()
  @IsNotEmpty()
  contactPhone: string;

  @IsString()
  @IsOptional()
  contactZalo?: string;

  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsOptional()
  ward?: string;

  @IsString()
  @IsOptional()
  streetAddress?: string;

  @IsString()
  @IsOptional()
  oldAddressNote?: string;

  @IsBoolean()
  @IsOptional()
  shippingAvailable?: boolean;

  @IsString()
  @IsOptional()
  shippingNote?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;
}

export class UpdateListingDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsEnum(PriceType)
  @IsOptional()
  priceType?: PriceType;

  @IsEnum(ListingCondition)
  @IsOptional()
  condition?: ListingCondition;

  @IsEnum(ListingStatus)
  @IsOptional()
  status?: ListingStatus;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  videoUrl?: string;

  @IsString()
  @IsOptional()
  contactName?: string;

  @IsString()
  @IsOptional()
  contactPhone?: string;

  @IsString()
  @IsOptional()
  contactZalo?: string;

  @IsString()
  @IsOptional()
  province?: string;

  @IsString()
  @IsOptional()
  district?: string;

  @IsString()
  @IsOptional()
  ward?: string;

  @IsString()
  @IsOptional()
  streetAddress?: string;

  @IsString()
  @IsOptional()
  oldAddressNote?: string;

  @IsBoolean()
  @IsOptional()
  shippingAvailable?: boolean;

  @IsString()
  @IsOptional()
  shippingNote?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;
}

export class QueryListingDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  categorySlug?: string;

  @IsString()
  @IsOptional()
  province?: string;

  @IsEnum(ListingStatus)
  @IsOptional()
  status?: ListingStatus;

  @IsEnum(ListingCondition)
  @IsOptional()
  condition?: ListingCondition;

  @IsOptional()
  minPrice?: number;

  @IsOptional()
  maxPrice?: number;

  @IsString()
  @IsOptional()
  sortBy?: 'createdAt' | 'price' | 'views' | 'likesCount';

  @IsString()
  @IsOptional()
  sortOrder?: 'ASC' | 'DESC';
}

export class CreateListingCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  parentId?: string;
}

export class CreateListingReportDto {
  @IsString()
  @IsNotEmpty()
  reason: string;
}
