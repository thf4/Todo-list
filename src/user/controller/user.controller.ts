import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Types } from 'mongoose';
import { CurrentUser } from '../../entities/ICurrentUser';

import { IUser, UserWithTodo } from '../../entities/IUser';
import { AuthService } from '../../middlewares/auth.service';
import { Users } from '../../Shared/decorators/user.decorator';
import { LoginDto, LoginToken, UserDto } from '../dto/user.dto';
import { User } from '../schemas/user.schema';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,) {}

  @Get()
  findAll(): Promise<IUser[]> {
    try {
      return this.userService.findAll();
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  find(@Param('id') id: Types.ObjectId): Promise<User> {
    try {
      return this.userService.findOne(id);
    } catch(err) {
      throw err;
    }
  }

  @Post()
  create(@Body() dto: UserDto): Promise<User> {
    try {
      return this.userService.create(dto);
    } catch (err) {
      throw err;
    }
  }

  @Post('login')
  login(@Body() dto: LoginDto): Promise<LoginToken> {
    try{
      return this.authService.login(dto);
    } catch(err) {
      throw err;
    };
  }

}
