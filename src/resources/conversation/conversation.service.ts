import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './entities/conversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    private readonly usersService: UsersService,
  ) {}

  async create(createConversationDto: CreateConversationDto, userId?: string) {
    const user = await this.usersService.findOneById(userId);
    if (user) createConversationDto.users = [user];
    const conversation = this.conversationRepository.create(
      createConversationDto,
    );
    return this.conversationRepository.save(conversation);
  }

  findAll() {
    return this.conversationRepository.find();
  }

  async findOne(id: string): Promise<Conversation | undefined> {
    const conversation = await this.conversationRepository.findOne({
      where: { id },
      relations: ['participants', 'messages', 'messages.user'],
    });

    if (!conversation) {
      throw new BadRequestException("conversation doesn't exit");
    }

    conversation.messages = conversation.messages.reverse();

    return conversation;
  }

  async update(id: string, updateConversationDto: UpdateConversationDto) {
    const conversation = await this.findOne(id);
    return this.conversationRepository.save({
      ...conversation,
      ...updateConversationDto,
    });
  }

  remove(id: string) {
    this.conversationRepository.delete(id);
  }

  async getOrCreateConversation(senderId: string, recipientId: string) {
    let conversation = await this.usersService.getUsersConversation(
      senderId,
      recipientId,
    );

    if (!conversation) {
      const sender = await this.usersService.findOneById(senderId);
      const recipient = await this.usersService.findOneById(recipientId);
      conversation = new Conversation();
      conversation.participants = [sender, recipient];
      await this.conversationRepository.save(conversation);
    }

    return conversation;
  }
}
