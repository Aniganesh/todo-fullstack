import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { CreateUser } from 'dtos';
import { Users } from 'src/models/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepo: Repository<Users>,
    private configService: ConfigService,
  ) {}

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

  public async create(userDto: CreateUser) {
    const user = this.userRepo.create(userDto);
    return this.userRepo.save(user);
  }

  public async changePassword(userId: string, password: string) {
    const hashedPassword = await hash(
      password,
      +this.configService.get('SALT_OR_ROUNDS'),
    );
    this.userRepo.update(userId, { password: hashedPassword });
  }

  public async update(userId: string, data: Partial<Users>) {
    return this.userRepo.update(userId, data);
  }

  public async get(id: string) {
    return this.userRepo.findOneBy({ id });
  }
}
