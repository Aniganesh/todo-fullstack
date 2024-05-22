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
import { CreateUserDto, PasswordChangeDto, UpdateUserDto } from 'src/dtos/user';
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
  async addUser(@Body() payload: CreateUserDto) {
    try {
      const schema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      });
      schema.parse(payload);
    } catch (err) {
      throw new HttpException(err.issues.toString(), HttpStatus.BAD_REQUEST);
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
  async changePassword(@Req() req, @Body() body: PasswordChangeDto) {
    try {
      const schema = z.object({
        currentPassword: z.string(),
        newPassword: z.string(),
      });
      schema.parse(body);
    } catch (err) {
      throw new HttpException(err.issues.toString(), HttpStatus.BAD_REQUEST);
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

  @Post('user')
  @UseGuards(JWTAuthGuard)
  async updateUser(@Req() req, @Body() body: UpdateUserDto) {
    try {
      const schema = z.object({
        name: z.string(),
      });
      schema.parse(body);
    } catch (err) {
      throw new HttpException(err.issues.toString(), HttpStatus.BAD_REQUEST);
    }
    const updateRes = await this.userService.update(req.user.id, body);
    if (updateRes.affected) {
      return this.userService.get(req.user.id);
    } else {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
