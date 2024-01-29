import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { CreateMessageDto } from 'src/resources/message/dto/create-message.dto';
import { MessageService } from 'src/resources/message/message.service';
import { CreateUserDto } from 'src/resources/users/dto/create-user.dto';
import { UsersService } from 'src/resources/users/users.service';
import { socketioEvents } from 'src/utils/constants/socketioEvents';

@Injectable()
export class SocketService {
  private readonly connectedClients: Map<string, Socket> = new Map();

  constructor(
    private readonly usersService: UsersService,
    private readonly messageService: MessageService,
  ) {}

  handleConnection(socket: Socket, server: any): void {
    const clientId = socket.id;
    this.connectedClients.set(clientId, socket);

    socket.on(socketioEvents.disconnect, () => {
      this.connectedClients.delete(clientId);
    });

    socket.on(socketioEvents.username, async (username) => {
      let user = await this.usersService.findOne(username);

      if (!user)
        user = await this.usersService.create({
          username,
          imageUrl: 'https://loremflickr.com/100/100',
        } as CreateUserDto);
      this.retrieveUser(user, server);
    });

    socket.on(
      socketioEvents.addMessage,
      async (
        message: CreateMessageDto,
        senderId: string,
        recipientId: string,
      ) => {
        const retrievedMessage = await this.messageService.create(
          message,
          senderId,
          recipientId,
        );

        if (retrievedMessage) this.retrieveMessage(retrievedMessage, server);
      },
    );
  }

  retrieveUser(user, server) {
    server.emit(socketioEvents.retrieveUser, user);
  }

  retrieveMessage(retrievedMessage, server) {
    server.emit(socketioEvents.retrieveMessage, retrievedMessage);
  }

  retrieveConversation(retrievdConversation, server) {
    server.emit(socketioEvents.retrieveConversation, retrievdConversation);
  }
}
