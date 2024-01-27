import { Message } from 'src/resources/message/entities/message.entity';
import { User } from 'src/resources/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => User)
  users: User[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
