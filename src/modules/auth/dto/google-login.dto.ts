import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GoogleLoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Google credential token không được để trống' })
  credential: string;

  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean;
}
