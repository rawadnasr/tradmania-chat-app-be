import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './entities/conversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { MessageService } from '../message/message.service';
import { CreateMessageDto } from '../message/dto/create-message.dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    private readonly usersService: UsersService,
    private readonly messageService: MessageService,
  ) {}

  create(createConversationDto: CreateConversationDto) {
    const conversation = this.conversationRepository.create(
      createConversationDto,
    );
    return this.conversationRepository.save(conversation);
  }

  findAll() {
    return this.conversationRepository.find();
  }

  async findOne(id: string): Promise<Conversation | undefined> {
    const conversation = await this.conversationRepository.findOneBy({ id });

    if (!conversation) {
      throw new BadRequestException("conversation doesn't exit");
    }

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

  async createConversationAndMessage(
    senderId: string,
    recipientId: string,
    message: CreateMessageDto,
  ) {
    // Retrieve sender and recipient users
    const sender = await this.usersService.findOneById(senderId);
    const recipient = await this.usersService.findOneById(recipientId);

    // Check if a conversation exists
    let conversation = await this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.users', 'users')
      .where('users.id IN (:...userIds)', { userIds: [senderId, recipientId] })
      .groupBy('conversation.id')
      .having('COUNT(DISTINCT users.id) = 2')
      .getOne();

    // If a conversation doesn't exist, create a new one
    if (!conversation) {
      conversation = new Conversation();
      conversation.users = [sender, recipient];
      await this.conversationRepository.save(conversation);
    }

    // Create a new message
    message.user = sender;
    message.conversation = conversation;

    // Save the message
    await this.messageService.create(message);

    return { conversation, message };
  }
}
