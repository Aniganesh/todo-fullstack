import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/models/todos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly repo: Repository<Todo>,
  ) {}

  public async getAll() {
    return await this.repo.find();
  }
  public async getOne(id: string) {
    return await this.repo.findOne({ where: { id } });
  }
}
