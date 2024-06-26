import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoFilter, UpdateTodo } from 'dtos';
import { CreateTodoForUser } from 'src/dtos/todo';
import { EntitySort } from 'src/models/base.entity';
import { Todo } from 'src/models/todos.entity';
import { Users } from 'src/models/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly repo: Repository<Todo>,
  ) {}

  public async getAllForUser(
    user: Users,
    filter?: Partial<TodoFilter>,
    sort?: EntitySort,
  ) {
    const query = this.repo
      .createQueryBuilder('todos')
      .andWhere('todos.userId=:id', { id: user.id });
    if (filter) {
      if (filter.status && filter.status.length) {
        const q: [string, object] =
          typeof filter.status === 'string'
            ? [`todos.status=:status`, { status: filter.status }]
            : [
                filter.status
                  .map((_, i) => `todos.status=:status${i}`)
                  .join(' OR '),
                Object.fromEntries(
                  filter.status.map((status, i) => [[`status${i}`], status]),
                ),
              ];
        query.andWhere(...q);
      }
      if (filter.contains) {
        query.andWhere(
          `(LOWER(todos.title) LIKE '%${filter.contains.toLowerCase()}%' OR LOWER(todos.description) LIKE '%${filter.contains.toLowerCase()}%')`,
        );
      }
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
    const savedValue = await this.repo.save(todo);
    return this.repo.findOneBy({ id: savedValue.id });
  }

  public async updateOne(updateDto: UpdateTodo) {
    return this.repo.save(updateDto);
  }

  public async deleteOne(id: string) {
    return this.repo.delete(id);
  }
}
