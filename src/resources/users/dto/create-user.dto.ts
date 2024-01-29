import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  imageUrl: string;

  @IsNotEmpty()
  username: string;
}
