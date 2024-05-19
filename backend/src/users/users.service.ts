import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/user';
import { Users } from 'src/models/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private userRepo: Repository<Users>) {}

  public async findOne(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }

  public async findByEmail(email: string, includePassword = false) {
    const query = this.userRepo
      .createQueryBuilder('users')
      .select('users')
      .where(`users.email= :email`, { email });

    if (includePassword) {
      query.addSelect('users.password');
    }

    const res = await query.getOne();
    return res;
  }

  public async create(userDto: CreateUserDto) {
    const user = this.userRepo.create(userDto);
    return this.userRepo.save(user);
  }
}
