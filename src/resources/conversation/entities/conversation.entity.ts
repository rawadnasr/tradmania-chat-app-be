import { Message } from 'src/resources/message/entities/message.entity';
import { User } from 'src/resources/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @ManyToMany(() => User, (user) => user.conversations)
  @JoinTable({ name: 'conversation_participants' })
  participants: User[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
