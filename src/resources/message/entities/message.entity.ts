import { MessageType } from 'src/models/enums';
import { Conversation } from 'src/resources/conversation/entities/conversation.entity';
import { User } from 'src/resources/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  text: string;

  @Column({ type: 'longblob', nullable: true })
  audio: Buffer;

  @Column({ type: 'longblob', nullable: true })
  image: Buffer;

  @Column({ type: 'enum', enum: MessageType })
  type: MessageType;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @CreateDateColumn()
  createdAt: Date; // Creation date
}
