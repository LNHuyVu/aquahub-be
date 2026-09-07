import { IsString, IsNotEmpty, IsEnum, IsOptional, IsBoolean, IsUrl } from 'class-validator';
import { AdPosition } from '../entities/ad.entity';

export class CreateAdDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  targetUrl: string;

  @IsEnum(AdPosition)
  @IsOptional()
  position?: AdPosition;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;
}
