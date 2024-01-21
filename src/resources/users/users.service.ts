import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOneBy({
      username: createUserDto.username,
    });

    if (user) {
      throw new BadRequestException('Already exists');
    }

    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  async findOneById(id: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException("User doesn't exit");
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, userId: number) {
    const user = await this.findOneById(id);

    if (user.id !== userId) throw new UnauthorizedException();

    return this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: number, userId: number): Promise<void> {
    const user = await this.findOneById(id);
    if (user.id !== userId) throw new UnauthorizedException();
    await this.usersRepository.delete(id);
  }
}
