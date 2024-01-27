import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { ConversationModule } from './resources/conversation/conversation.module';
import { MessageModule } from './resources/message/message.module';
import { UsersModule } from './resources/users/users.module';
import { LikeModule } from './resources/like/like.module';
import { MatchModule } from './resources/match/match.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    ConversationModule,
    MessageModule,
    LikeModule,
    MatchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
