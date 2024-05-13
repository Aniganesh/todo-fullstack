import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodo, UpdateTodo } from 'src/dtos/todo';
import { Todo } from 'src/models/todos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly repo: Repository<Todo>,
  ) {}

  public async getAll() {
    return this.repo.find();
  }

  public async getOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  public async createOne(todoDto: CreateTodo) {
    const todo = this.repo.create(todoDto);
    return this.repo.save(todo);
  }

  public async updateOne({ id, ...otherData }: UpdateTodo) {
    return this.repo.update(id, otherData);
  }
  public async deleteOne(id: string) {
    return this.repo.delete(id);
  }
}
