import { Injectable } from '@nestjs/common';
import { Users } from 'src/models/users.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validate(email: string, password: string): Promise<Users | null> {
    const user = await this.usersService.findByEmail(email, true);
    if (!user) return null;
    const passwordIsValid = compareSync(password, user.password);
    return passwordIsValid ? user : null;
  }

  login(user: Users): { access_token: string } {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('SECRET'),
        privateKey: this.configService.get('SECRET'),
      }),
    };
  }

  verify(accessToken: string) {
    const fixedAccessToken = accessToken.replace('Bearer ', '');
    const decoded = this.jwtService.verify(fixedAccessToken, {
      secret: this.configService.get('JWT_SECRET'),
    });
    const user = this.usersService.findByEmail(decoded.email);
    if (!user) throw new Error('User not found');
    return user;
  }
}
