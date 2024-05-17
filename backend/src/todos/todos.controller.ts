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
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodo, UpdateTodo } from 'src/dtos/todo';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('todos')
@UseGuards(JWTAuthGuard)
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  public async getTodos(@Req() req) {
    return this.todosService.getAllForUser(req._user.id);
  }

  @Get(':id')
  public async getTodo(@Param('id') id: string) {
    const todo = await this.todosService.getOne(id);
    if (!todo)
      throw new HttpException('Could not find task', HttpStatus.NOT_FOUND);
    return todo;
  }

  @Post()
  public async postTodos(@Req() req, @Body() todo: CreateTodo) {
    return this.todosService.createOne({ ...todo, user: req._user.id });
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
