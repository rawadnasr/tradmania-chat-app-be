import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { ConversationModule } from '../conversation/conversation.module';
import { ConversationService } from '../conversation/conversation.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    ConversationModule,
    UsersModule,
  ],
  controllers: [MessageController],
  providers: [MessageService, ConversationService, UsersService],
  exports: [TypeOrmModule],
})
export class MessageModule {}
