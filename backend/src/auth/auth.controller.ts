import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUser, PasswordChange } from 'dtos';
import { LocalAuthGuard } from 'src/guards/local.guard';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async addUser(@Body() payload: CreateUser) {
    try {
      const schema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      });
      schema.parse(payload);
    } catch (err) {
      throw new HttpException(err.issues, HttpStatus.BAD_REQUEST);
    }
    if (payload.password)
      payload.password = await hash(
        payload.password,
        +this.configService.get('SALT_OR_ROUNDS'),
      );
    return this.userService.create(payload);
  }

  @Get('me')
  @UseGuards(JWTAuthGuard)
  me(@Req() req) {
    return req.user;
  }

  @Post('password')
  @UseGuards(JWTAuthGuard)
  async changePassword(@Req() req, @Body() body: PasswordChange) {
    try {
      const schema = z.object({
        currentPassword: z.string(),
        newPassword: z.string(),
      });
      schema.parse(body);
    } catch (err) {
      throw new HttpException(err.issues, HttpStatus.BAD_REQUEST);
    }
    const user = await this.authService.validate(
      req.user.email,
      body.currentPassword,
    );
    if (user) {
      return this.userService.changePassword(user.id, body.newPassword);
    }
    throw new UnauthorizedException();
  }
}
