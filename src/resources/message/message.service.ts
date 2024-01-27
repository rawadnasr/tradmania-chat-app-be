import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  create(createMessageDto: CreateMessageDto) {
    const message = this.messageRepository.create(createMessageDto);
    return this.messageRepository.save(message);
  }

  findAll() {
    return this.messageRepository.find();
  }

  async findOne(id: string): Promise<Message | undefined> {
    const message = await this.messageRepository.findOneBy({ id });

    if (!message) {
      throw new BadRequestException("Message doesn't exit");
    }

    return message;
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    const message = await this.findOne(id);
    return this.messageRepository.save({
      ...message,
      ...updateMessageDto,
    });
  }

  remove(id: string) {
    this.messageRepository.delete(id);
  }
}
