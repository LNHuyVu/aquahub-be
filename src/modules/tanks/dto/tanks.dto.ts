import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsEnum, IsObject } from 'class-validator';
import { TankLogType } from '../entities/tank.entity';

export class CreateTankDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên hồ cá không được để trống' })
  name: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsNumber()
  length?: number;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  ph?: number;

  @IsOptional()
  @IsNumber()
  temperature?: number;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateTankDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsNumber()
  length?: number;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  ph?: number;

  @IsOptional()
  @IsNumber()
  temperature?: number;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}

export class AddTankFishDto {
  @IsString()
  @IsNotEmpty({ message: 'Loại cá không được để trống' })
  fishId: string;

  @IsOptional()
  @IsNumber()
  quantity?: number = 1;
}

export class CreateTankLogDto {
  @IsEnum(TankLogType)
  type: TankLogType;

  @IsString()
  @IsNotEmpty({ message: 'Nội dung nhật ký không được để trống' })
  content: string;

  @IsOptional()
  @IsObject()
  parameters?: Record<string, any>;
}
