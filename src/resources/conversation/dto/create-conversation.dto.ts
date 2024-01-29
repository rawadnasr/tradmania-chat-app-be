import { IsOptional } from 'class-validator';
import { User } from 'src/resources/users/entities/user.entity';

export class CreateConversationDto {
  id: string;
  @IsOptional()
  name: string;
  users: User[];
}
