import { Conversation } from 'src/resources/conversation/entities/conversation.entity';
import { Like } from 'src/resources/like/entities/like.entity';
import { Match } from 'src/resources/match/entities/match.entity';
import { Message } from 'src/resources/message/entities/message.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @ManyToMany(() => Conversation, (conversation) => conversation.users)
  @JoinTable({ name: 'user_conversations' })
  conversations: Conversation[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => Like, (like) => like.sender)
  sentLikes: Like[];

  @OneToMany(() => Like, (like) => like.receiver)
  receivedLikes: Like[];

  @OneToMany(() => Match, (match) => match.user1)
  matches1: Match[];

  @OneToMany(() => Match, (match) => match.user2)
  matches2: Match[];

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  @DeleteDateColumn()
  deleted_at: Date; // Deletion date

  @Column({ default: true })
  isActive: boolean;
}
