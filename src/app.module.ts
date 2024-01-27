import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { ConversationModule } from './resources/conversation/conversation.module';
import { MessageModule } from './resources/message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConversationModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
