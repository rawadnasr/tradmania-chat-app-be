import { IsOptional } from 'class-validator';

export class QueryDto {
  @IsOptional()
  userId: string;
}
