import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { SocketGateway } from './socket/socket.gateway';
import { MessagesGateway } from './gateways/messages/messages.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  // providers: [AppService, SocketGateway],
  providers: [AppService, MessagesGateway],
})
export class AppModule {}
