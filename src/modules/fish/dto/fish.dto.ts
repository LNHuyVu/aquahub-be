import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber, IsArray, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { DifficultyLevel, SwimLevel } from '../entities/fish.entity';

export class QueryFishDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsEnum(DifficultyLevel)
  difficulty?: DifficultyLevel;

  @IsOptional()
  @IsEnum(SwimLevel)
  swimLevel?: SwimLevel;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 24;

  @IsOptional()
  @IsString()
  sort?: string = 'createdAt';

  @IsOptional()
  @IsString()
  order?: 'ASC' | 'DESC' = 'DESC';
}

export class CreateFishDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên tiếng Việt không được để trống' })
  nameVi: string;

  @IsOptional()
  @IsString()
  nameEn?: string;

  @IsOptional()
  @IsString()
  scientificName?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  categoryName?: string;

  @IsOptional()
  @IsArray()
  categoryIds?: string[];

  @IsOptional()
  @IsArray()
  categoryNames?: string[];

  @IsOptional()
  @IsArray()
  categorySlugs?: string[];

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsNumber()
  sizeMin?: number;

  @IsOptional()
  @IsNumber()
  sizeMax?: number;

  @IsOptional()
  @IsString()
  lifespan?: string;

  @IsOptional()
  @IsEnum(DifficultyLevel)
  difficulty?: DifficultyLevel;

  @IsOptional()
  @IsNumber()
  tempMin?: number;

  @IsOptional()
  @IsNumber()
  tempMax?: number;

  @IsOptional()
  @IsNumber()
  phMin?: number;

  @IsOptional()
  @IsNumber()
  phMax?: number;

  @IsOptional()
  @IsNumber()
  minTankSize?: number;

  @IsOptional()
  @IsEnum(SwimLevel)
  swimLevel?: SwimLevel;

  @IsOptional()
  @IsString()
  temperament?: string;

  @IsOptional()
  @IsString()
  diet?: string;

  @IsOptional()
  @IsString()
  compatibleFish?: string;

  @IsOptional()
  @IsString()
  incompatibleFish?: string;

  @IsOptional()
  @IsString()
  commonDiseases?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
