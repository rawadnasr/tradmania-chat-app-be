import { IsNotEmpty } from 'class-validator';

export class QueryDto {
  @IsNotEmpty()
  userId: string;
}
