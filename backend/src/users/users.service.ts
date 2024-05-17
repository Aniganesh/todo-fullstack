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

  public async findByEmail(email: string, includePassword = false) {
    const query = this.repo
      .createQueryBuilder()
      .select('user')
      .where({ email });

    if (includePassword) {
      query.addSelect('password');
    }

    return query.getOne();
  }

  public async create(userDto: CreateUserDto) {
    const user = this.repo.create(userDto);
    return this.repo.save(user);
  }
}
