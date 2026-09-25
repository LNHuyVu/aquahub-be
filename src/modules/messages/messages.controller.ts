import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('conversations')
  async getUserConversations(@CurrentUser('id') userId: string) {
    return this.messagesService.getUserConversations(userId);
  }

  @Post('conversations/start')
  async startConversation(
    @CurrentUser('id') userId: string,
    @Body('listingId') listingId: string,
  ) {
    return this.messagesService.getOrCreateConversation(userId, listingId);
  }

  @Get('conversations/:id/messages')
  async getMessages(
    @CurrentUser('id') userId: string,
    @Param('id') conversationId: string,
  ) {
    return this.messagesService.getConversationMessages(conversationId, userId);
  }

  @Post('conversations/:id/send')
  async sendMessage(
    @CurrentUser('id') userId: string,
    @Param('id') conversationId: string,
    @Body('content') content: string,
  ) {
    return this.messagesService.createMessage(userId, conversationId, content);
  }
}
