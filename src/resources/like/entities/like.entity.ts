import { User } from 'src/resources/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.sentLikes)
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedLikes)
  receiver: User;
}
