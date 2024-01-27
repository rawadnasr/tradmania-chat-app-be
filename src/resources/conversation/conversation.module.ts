import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { UsersService } from '../users/users.service';
import { MessageService } from '../message/message.service';
import { UsersModule } from '../users/users.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation]),
    UsersModule,
    MessageModule,
  ],
  controllers: [ConversationController],
  providers: [ConversationService, UsersService, MessageService],
  exports: [TypeOrmModule],
})
export class ConversationModule {}
