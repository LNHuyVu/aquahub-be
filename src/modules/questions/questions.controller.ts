import { Controller, Get, Post, Body, Param, Query, UseGuards, Patch, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto, CreateAnswerDto } from './dto/questions.dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Public()
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 24,
    @Query('search') search?: string,
  ) {
    return this.questionsService.findAll(page, limit, search);
  }

  @Public()
  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.questionsService.findBySlug(slug);
  }

  @Post()
  async createQuestion(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateQuestionDto,
  ) {
    return this.questionsService.createQuestion(userId, dto);
  }

  @Post(':id/answers')
  async addAnswer(
    @CurrentUser('id') userId: string,
    @Param('id') questionId: string,
    @Body() dto: CreateAnswerDto,
  ) {
    return this.questionsService.addAnswer(userId, questionId, dto);
  }

  @Patch(':id/best-answer/:answerId')
  async selectBestAnswer(
    @CurrentUser('id') userId: string,
    @Param('id') questionId: string,
    @Param('answerId') answerId: string,
  ) {
    return this.questionsService.selectBestAnswer(userId, questionId, answerId);
  }

  @Delete(':id')
  async deleteQuestion(
    @CurrentUser('id') userId: string,
    @CurrentUser('role') userRole: string,
    @Param('id') id: string,
  ) {
    return this.questionsService.deleteQuestion(userId, userRole, id);
  }
}
