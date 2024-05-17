import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/user';
import { Users } from 'src/models/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private repo: Repository<Users>) {}

  public async findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  public async findByEmail(email: string, _includePassword = true) {
    return this.repo
      .createQueryBuilder()
      .select('user')
      .where({ email })
      .addSelect('password')
      .getOne();
  }
  public async createUser(userDto: CreateUserDto) {
    const user = this.repo.create(userDto);
    return this.repo.save(user);
  }
}
