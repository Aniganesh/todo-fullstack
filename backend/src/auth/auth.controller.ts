import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { hash } from 'bcrypt';
import { CreateUserDto } from 'src/dtos/user';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Get('/email/:email')
  @UseGuards(AuthGuard('jwt'))
  async getUserByEmail(@Param('email') email: string) {
    return await this.userService.findByEmail(email);
  }

  @Post()
  async addUser(@Body() payload: CreateUserDto) {
    const saltOrRounds = 15;
    if (payload.password)
      payload.password = hash(payload.password, saltOrRounds);
    return this.userService.create(payload);
  }
}
