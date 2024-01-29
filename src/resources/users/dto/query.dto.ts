import { IsOptional } from 'class-validator';

export class QueryDto {
  @IsOptional()
  username: string;

  @IsOptional()
  recipientId: string;
}
