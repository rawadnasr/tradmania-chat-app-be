import { IsOptional } from 'class-validator';
import { MessageType } from 'src/models/enums';
import { Conversation } from 'src/resources/conversation/entities/conversation.entity';
import { User } from 'src/resources/users/entities/user.entity';

export class CreateMessageDto {
  @IsOptional()
  text: string;
  @IsOptional()
  audio: Buffer;
  @IsOptional()
  image: Buffer;
  type: MessageType;
  user: User;
  conversation: Conversation;
}
