import { IsOptional } from 'class-validator';
import { User } from 'src/resources/users/entities/user.entity';

export class CreateConversationDto {
  id: number;
  @IsOptional()
  name: string;
  users: User[];
}
