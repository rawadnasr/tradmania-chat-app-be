import { User } from 'src/resources/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.matches1)
  user1: User;

  @ManyToOne(() => User, (user) => user.matches2)
  user2: User;
}
