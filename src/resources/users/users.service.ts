import {
  BadRequestException,
  Injectable,
  NotFoundException,
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
  ) { }

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

  async findAll(username?: string): Promise<User[]> {
    if (username) return [await this.findOne(username)];
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  async findOneById(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneById(id);
    return this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async getUserConversations(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: [
        'conversations',
        'conversations.participants',
        'conversations.messages',
        'conversations.messages.user',
      ],
    });
    if (!user) {
      throw new NotFoundException();
    }

    return user.conversations;
  }

  async getUsersConversation(senderId: string, recipientId: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.conversations', 'conversation')
      .where('user.id = :senderId', { senderId })
      .andWhere('user.id = :recipientId', { recipientId })
      .getOne();

    if (!user) {
      return undefined;
    }

    return user.conversations[0];
  }
}
