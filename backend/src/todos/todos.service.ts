import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoForUser, UpdateTodo } from 'src/dtos/todo';
import { Todo } from 'src/models/todos.entity';
import { Users } from 'src/models/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly repo: Repository<Todo>,
  ) {}

  public async getAllForUser(user: Users) {
    return this.repo.find({ where: { user: { id: user.id } } });
  }

  public async getAll() {
    return this.repo.find();
  }

  public async getOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  public async createOne(todoDto: CreateTodoForUser) {
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
