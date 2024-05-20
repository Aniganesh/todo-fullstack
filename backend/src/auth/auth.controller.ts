import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from 'src/dtos/user';
import { LocalAuthGuard } from 'src/guards/local.guard';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async addUser(@Body() payload: CreateUserDto) {
    const saltOrRounds = 15;
    if (payload.password)
      payload.password = await hash(payload.password, saltOrRounds);
    return this.userService.create(payload);
  }

  @Get('me')
  @UseGuards(JWTAuthGuard)
  me(@Req() req) {
    return req.user;
  }
}
