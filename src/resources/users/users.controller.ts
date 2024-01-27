import {
  Controller,
  Param,
  Delete,
  Post,
  Body,
  Get,
  Patch,
  Res,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { QueryDto } from './dto/query.dto';
import { CommonResponseInterceptor } from 'src/interceptor/commonResponse.interceptor';

@UseInterceptors(CommonResponseInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.usersService.findAll(query?.username);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.usersService.remove(id);
    res.json({
      statusCode: 200,
      message: 'Removed succcessfully',
      data: [],
    });
  }

  @Get(':id/conversation')
  async getUserConversations(@Param('id') userId: string) {
    return this.usersService.getUserConversations(userId);
  }
}
