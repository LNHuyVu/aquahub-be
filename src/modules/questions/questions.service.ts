import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question, Answer } from './entities/question.entity';
import { CreateQuestionDto, CreateAnswerDto } from './dto/questions.dto';

import { User } from '../users/entities/user.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;
    const queryBuilder = this.questionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.author', 'author')
      .orderBy('question.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    if (search) {
      queryBuilder.andWhere(
        '(LOWER(question.title) LIKE LOWER(:search) OR LOWER(question.content) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string) {
    const question = await this.questionRepository.findOne({
      where: { slug },
      relations: { author: true },
    });

    if (!question) {
      throw new NotFoundException('Câu hỏi không tồn tại');
    }

    question.viewsCount += 1;
    await this.questionRepository.save(question);

    const answers = await this.answerRepository.find({
      where: { questionId: question.id },
      relations: { author: true },
      order: { isBestAnswer: 'DESC', likesCount: 'DESC', createdAt: 'ASC' },
    });

    return {
      ...question,
      answers,
    };
  }

  async createQuestion(userId: string, dto: CreateQuestionDto) {
    const slug = dto.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-') + '-' + Date.now().toString().slice(-4);

    const question = this.questionRepository.create({
      ...dto,
      slug,
      authorId: userId,
    });

    const savedQuestion = await this.questionRepository.save(question);

    // Auto generate AI Assistant answer in background
    this.generateAiAnswer(savedQuestion.id, savedQuestion.title, savedQuestion.content).catch((err) =>
      console.error('Failed to generate AI Answer:', err),
    );

    return savedQuestion;
  }

  private async generateAiAnswer(questionId: string, title: string, content: string) {
    // Find or create AI Assistant bot user
    let aiUser = await this.userRepository.findOne({ where: { username: 'aquahub_ai' } });
    if (!aiUser) {
      aiUser = await this.userRepository.save(
        this.userRepository.create({
          username: 'aquahub_ai',
          email: 'ai@aquahub.vn',
          password: '$2b$10$Wq3vXN8u1b9qZ8kY5qZ9uO.9h7tY6u5v4w3x2y1z0a1b2c3d4e5f6',
          displayName: 'AquaHub AI Assistant (Trợ Lý Thủy Sinh AI)',
          avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300',
          bio: 'Trợ lý trí tuệ nhân tạo chuyên tư vấn thông số nước, chọn loài cá và điều trị bệnh cá cảnh.',
        }),
      );
    }

    // Comprehensive free expert AI advice logic for aquarium queries
    const text = `${title} ${content}`.toLowerCase();
    let advice = '';

    if (text.includes('đục') || text.includes('vẩn') || text.includes('nước bẩn')) {
      advice = `🤖 **AquaHub AI - Phân Tích & Tư Vấn Nguồn Nước:**\n\nNước bị vẩn đục trắng ở bể mới thường do hiện tượng bùng nổ vi sinh (Bacterial Bloom).
**Các bước khắc phục nhanh:**
1. Giữ hệ thống lọc và sủi oxy chạy 24/7.
2. Không thay nước dồn dập (chỉ thay 20% nước sạch đã khử clo).
3. Châm thêm men vi sinh chất lượng (ExtraBio / Biozym) để vi sinh phát triển át cặn bẩn trong 3-5 ngày.`;
    } else if (text.includes('nấm') || text.includes('bệnh') || text.includes('xù vẩy') || text.includes('túm vây')) {
      advice = `🤖 **AquaHub AI - Chẩn Đoán & Hướng Dẫn Điều Trị Bệnh Cá:**\n\nDấu hiệu cúp vây/nổi đốm trắng thường xuất hiện khi cá bị sốc nhiệt hoặc môi trường nước có nồng độ NH3/NO2 cao.
**Phác đồ cấp cứu khuyên dùng:**
1. Nâng nhiệt độ cây sưởi bể lên 29°C - 30°C.
2. Châm muối hột liều lượng 2g/lít nước bể.
3. Nhỏ thuốc Bio Knock 2 (nếu bị nấm đốm trắng) hoặc Tetra Nhật đúng liều lượng chỉ định.
4. Tắt đèn bể và hạn chế cho cá ăn 24-48 giờ để giảm bớt căng thẳng.`;
    } else if (text.includes('rêu') || text.includes('tảo')) {
      advice = `🤖 **AquaHub AI - Giải Pháp Kiểm Soát Rêu Hại:**\n\nRêu hại phát triển do thừa ánh sáng đèn hoặc dư thừa hàm lượng Dinh dưỡng / Nitrate.
**Khuyến nghị xử lý:**
1. Giảm thời gian bật đèn xuống 6-8 tiếng/ngày.
2. Xịt trực tiếp Oxy Già (H2O2 3%) hoặc dung dịch diệt rêu chuyên dụng vào cụm rêu chùm đen.
3. Thả thêm tép Amano, ốc Nerita hoặc cá Nô Lệ (SAE) để dọn dẹp sinh học.`;
    } else {
      advice = `🤖 **AquaHub AI - Hướng Dẫn Kỹ Thuật Nuôi & Chăm Sóc:**\n\nCảm ơn bạn đã gửi câu hỏi đến cộng đồng AquaHub!
**Lời khuyên cơ bản từ Trợ Lý AI:**
- **Nhiệt độ bể lý tưởng:** 25°C - 28°C.
- **Độ pH an toàn:** 6.5 - 7.5 cho đa số các loài cá nhiệt đới.
- **Quy trình thay nước:** Thay 20-30% nước sạch đã trữ loại bỏ Clo định kỳ mỗi tuần 1 lần.
- Luôn theo dõi biểu hiện bơi lội và lượng thức ăn dư thừa đọng dưới đáy bể.`;
    }

    const aiAnswer = this.answerRepository.create({
      content: advice,
      questionId,
      authorId: aiUser.id,
      isAiGenerated: true,
    });

    await this.answerRepository.save(aiAnswer);

    // Update question answers count
    const q = await this.questionRepository.findOne({ where: { id: questionId } });
    if (q) {
      q.answersCount += 1;
      await this.questionRepository.save(q);
    }
  }

  async addAnswer(userId: string, questionId: string, dto: CreateAnswerDto) {
    const question = await this.questionRepository.findOne({ where: { id: questionId } });
    if (!question) throw new NotFoundException('Câu hỏi không tồn tại');

    const answer = this.answerRepository.create({
      ...dto,
      questionId,
      authorId: userId,
    });
    const saved = await this.answerRepository.save(answer);

    question.answersCount += 1;
    await this.questionRepository.save(question);

    return this.answerRepository.findOne({
      where: { id: saved.id },
      relations: { author: true },
    });
  }

  async selectBestAnswer(userId: string, questionId: string, answerId: string) {
    const question = await this.questionRepository.findOne({ where: { id: questionId } });
    if (!question) throw new NotFoundException('Câu hỏi không tồn tại');

    if (question.authorId !== userId) {
      throw new ForbiddenException('Chỉ người đặt câu hỏi mới có thể chọn câu trả lời hay nhất');
    }

    const answer = await this.answerRepository.findOne({ where: { id: answerId, questionId } });
    if (!answer) throw new NotFoundException('Câu trả lời không tồn tại');

    // Unmark previous best answer
    await this.answerRepository.update({ questionId }, { isBestAnswer: false });

    answer.isBestAnswer = true;
    await this.answerRepository.save(answer);

    question.isSolved = true;
    question.bestAnswerId = answerId;
    await this.questionRepository.save(question);

    return { success: true };
  }
}
