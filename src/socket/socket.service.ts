import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { socketioEvents } from 'src/utils/constants/socketioEvents';

@Injectable()
export class SocketService {
  private readonly connectedClients: Map<string, Socket> = new Map();

  handleConnection(socket: Socket): void {
    const clientId = socket.id;
    this.connectedClients.set(clientId, socket);

    console.log('clientId', clientId);

    socket.on(socketioEvents.disconnect, () => {
      this.connectedClients.delete(clientId);
    });

    socket.on(socketioEvents.message, (message) => {
      console.log('recieved messages', message);
    });
  }
}
