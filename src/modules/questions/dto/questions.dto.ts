import { IsString, IsNotEmpty, IsOptional, IsArray, IsObject } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty({ message: 'Tiêu đề câu hỏi không được để trống' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Nội dung chi tiết không được để trống' })
  content: string;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsObject()
  tankInfo?: Record<string, any>;
}

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty({ message: 'Nội dung câu trả lời không được để trống' })
  content: string;
}
