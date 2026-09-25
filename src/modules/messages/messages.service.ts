import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation, Message, MessageType } from './entities/message.entity';
import { Listing } from '../listings/entities/listing.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepo: Repository<Conversation>,
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,
    @InjectRepository(Listing)
    private listingRepo: Repository<Listing>,
  ) {}

  // Get or Create conversation for a specific listing between buyer and seller
  async getOrCreateConversation(buyerId: string, listingId: string) {
    const listing = await this.listingRepo.findOne({
      where: { id: listingId },
      relations: { user: true },
    });

    if (!listing) throw new NotFoundException('Tin đăng không tồn tại');
    if (listing.userId === buyerId) {
      throw new BadRequestException('Bạn không thể nhắn tin với chính tin đăng của mình');
    }

    let conversation = await this.conversationRepo.findOne({
      where: { buyerId, sellerId: listing.userId, listingId },
      relations: { buyer: true, seller: true, listing: true },
    });

    if (!conversation) {
      conversation = this.conversationRepo.create({
        buyerId,
        sellerId: listing.userId,
        listingId,
        unreadBuyerCount: 0,
        unreadSellerCount: 0,
      });
      conversation = await this.conversationRepo.save(conversation);
      
      // Re-fetch with relations
      conversation = await this.conversationRepo.findOne({
        where: { id: conversation.id },
        relations: { buyer: true, seller: true, listing: true },
      }) as Conversation;
    }

    return conversation;
  }

  // Get all conversations for a logged in user (as buyer or seller)
  async getUserConversations(userId: string) {
    const conversations = await this.conversationRepo.find({
      where: [{ buyerId: userId }, { sellerId: userId }],
      relations: { buyer: true, seller: true, listing: true },
      order: { lastMessageAt: 'DESC', createdAt: 'DESC' },
    });

    return conversations;
  }

  // Get messages for a specific conversation with pagination / history
  async getConversationMessages(conversationId: string, userId: string) {
    const conversation = await this.conversationRepo.findOne({
      where: { id: conversationId },
    });

    if (!conversation) throw new NotFoundException('Cuộc trò chuyện không tồn tại');
    if (conversation.buyerId !== userId && conversation.sellerId !== userId) {
      throw new ForbiddenException('Bạn không có quyền truy cập cuộc trò chuyện này');
    }

    // Reset unread count for current user
    if (conversation.buyerId === userId && conversation.unreadBuyerCount > 0) {
      conversation.unreadBuyerCount = 0;
      await this.conversationRepo.save(conversation);
    } else if (conversation.sellerId === userId && conversation.unreadSellerCount > 0) {
      conversation.unreadSellerCount = 0;
      await this.conversationRepo.save(conversation);
    }

    const messages = await this.messageRepo.find({
      where: { conversationId },
      relations: { sender: true },
      order: { createdAt: 'ASC' },
    });

    return messages;
  }

  // Save new message and update conversation stats
  async createMessage(senderId: string, conversationId: string, content: string, type = MessageType.TEXT) {
    const conversation = await this.conversationRepo.findOne({
      where: { id: conversationId },
    });

    if (!conversation) throw new NotFoundException('Cuộc trò chuyện không tồn tại');
    if (conversation.buyerId !== senderId && conversation.sellerId !== senderId) {
      throw new ForbiddenException('Bạn không thuộc cuộc trò chuyện này');
    }

    const message = this.messageRepo.create({
      conversationId,
      senderId,
      content,
      type,
    });

    const savedMessage = await this.messageRepo.save(message);

    // Update conversation meta
    conversation.lastMessage = content;
    conversation.lastMessageAt = new Date();

    if (senderId === conversation.buyerId) {
      conversation.unreadSellerCount += 1;
    } else {
      conversation.unreadBuyerCount += 1;
    }

    await this.conversationRepo.save(conversation);

    return this.messageRepo.findOne({
      where: { id: savedMessage.id },
      relations: { sender: true },
    });
  }
}
