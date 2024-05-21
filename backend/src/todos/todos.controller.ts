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
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodo, UpdateTodo } from 'src/dtos/todo';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { z } from 'zod';

@Controller('todos')
@UseGuards(JWTAuthGuard)
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  public async getTodos(
    @Req() req,
    @Query('filter') filter: string,
    @Query('sort') sort: string,
  ) {
    return this.todosService.getAllForUser(
      req.user,
      filter && JSON.parse(filter),
      sort && JSON.parse(sort),
    );
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
    const schema = z.strictObject({
      description: z.string(),
      status: z.string(),
      title: z.string(),
    });
    try {
      schema.parse(todo);
    } catch (err) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    return this.todosService.createOne({ ...todo, user: req.user.id });
  }

  @Patch()
  public async updateTodo(@Body() data: UpdateTodo) {
    const schema = z.strictObject({
      id: z.string(),
      description: z.string().optional(),
      status: z.string().optional(),
      title: z.string().optional(),
      createDateTime: z.string().optional(),
      lastChangedDateTime: z.string().optional(),
    });
    try {
      schema.parse(data);
    } catch (err) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
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
    const schema = z.string();
    try {
      schema.parse(id);
    } catch (err) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    const deleteResult = await this.todosService.deleteOne(id);
    if (deleteResult.affected) return HttpStatus.NO_CONTENT;
  }
}
