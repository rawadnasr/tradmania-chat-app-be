import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';
import { UsersService } from 'src/resources/users/users.service';
import { UsersModule } from 'src/resources/users/users.module';
import { MessageModule } from 'src/resources/message/message.module';
import { MessageService } from 'src/resources/message/message.service';
import { ConversationModule } from 'src/resources/conversation/conversation.module';
import { ConversationService } from 'src/resources/conversation/conversation.service';

@Module({
  imports: [UsersModule, MessageModule, ConversationModule],
  providers: [
    SocketGateway,
    UsersService,
    SocketService,
    MessageService,
    ConversationService,
  ],
})
export class SocketModule {}
