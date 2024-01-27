import {
  Controller,
  Param,
  Delete,
  Post,
  Body,
  Get,
  Patch,
  Res,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    return this.usersService.update(+id, updateUserDto, +userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response, @Req() req: any) {
    const userId = req.user.userId;
    await this.usersService.remove(+id, +userId);
    res.json({
      statusCode: 200,
      message: 'Removed succcessfully',
      data: [],
    });
  }
}
