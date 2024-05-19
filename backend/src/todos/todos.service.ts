import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoForUser, UpdateTodo } from 'src/dtos/todo';
import { EntitySort } from 'src/models/base.entity';
import { Todo } from 'src/models/todos.entity';
import { Users } from 'src/models/users.entity';
import { Repository } from 'typeorm';

export type TodoFilter = Pick<Todo, 'status'>;

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly repo: Repository<Todo>,
  ) {}

  public async getAllForUser(
    user: Users,
    filter?: TodoFilter,
    sort?: EntitySort,
  ) {
    const query = this.repo
      .createQueryBuilder('todos')
      .andWhere('todos.userId=:id', { id: user.id });
    if (filter) {
      query.andWhere('todos.status=:status', { status: filter.status });
    }

    if (sort) {
      Object.entries(sort).forEach(([key, value]) => {
        query.addOrderBy(`todos.${key}`, value);
      });
    }
    return query.getMany();
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
