import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Controller()
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @MessagePattern('createConversation')
  create(@Payload() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(createConversationDto);
  }

  @MessagePattern('findAllConversation')
  findAll() {
    return this.conversationService.findAll();
  }

  @MessagePattern('findOneConversation')
  findOne(@Payload() id: number) {
    return this.conversationService.findOne(id);
  }

  @MessagePattern('updateConversation')
  update(@Payload() updateConversationDto: UpdateConversationDto) {
    return this.conversationService.update(
      updateConversationDto.id,
      updateConversationDto,
    );
  }

  @MessagePattern('removeConversation')
  remove(@Payload() id: number) {
    return this.conversationService.remove(id);
  }
}
