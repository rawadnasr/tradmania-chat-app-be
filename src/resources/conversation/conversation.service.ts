import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './entities/conversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
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

  async findOne(id: number): Promise<Conversation | undefined> {
    const conversation = await this.conversationRepository.findOneBy({ id });

    if (!conversation) {
      throw new BadRequestException("conversation doesn't exit");
    }

    return conversation;
  }

  async update(id: number, updateConversationDto: UpdateConversationDto) {
    const conversation = await this.findOne(id);
    return this.conversationRepository.save({
      ...conversation,
      ...updateConversationDto,
    });
  }

  remove(id: number) {
    this.conversationRepository.delete(id);
  }
}
