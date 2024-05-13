import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodo, UpdateTodo } from 'src/dtos/todo';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  public async getTodos() {
    return this.todosService.getAll();
  }

  @Get(':id')
  public async getTodo(@Param('id') id: string) {
    const todo = await this.todosService.getOne(id);
    if (!todo)
      throw new HttpException('Could not find task', HttpStatus.NOT_FOUND);
    return todo;
  }

  @Post()
  public async postTodos(@Body() todo: CreateTodo) {
    return this.todosService.createOne(todo);
  }

  @Patch()
  public async updateTodo(@Body() data: UpdateTodo) {
    const updateResult = await this.todosService.updateOne(data);
    if (updateResult.affected) return this.getTodo(data.id);
    else
      throw new HttpException(
        'Could not find task to update',
        HttpStatus.NOT_FOUND,
      );
  }

  @Delete(':id')
  public async deleteTodo(@Param('id') id: string) {
    const deleteResult = await this.todosService.deleteOne(id);
    if (deleteResult.affected) return HttpStatus.NO_CONTENT;
  }
}
