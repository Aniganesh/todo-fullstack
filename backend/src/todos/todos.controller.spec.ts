import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { CreateTodo } from 'src/dtos/todo';
import { Todo } from 'src/models/todos.entity';
import { Users } from 'src/models/users.entity';

describe('TodosController', () => {
  let controller: TodosController;

  const MockTodosService = {
    getAllForUser: jest.fn(),
    getAll: jest.fn(),
    getOne: jest.fn(),
    createOne: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: MockTodosService,
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create user todo', async () => {
    // arrange
    const createTodoDTO: CreateTodo = {
      description: 'description',
      title: 'title',
      status: 'todo',
    };

    const userId = 'user-id';

    const user: Users = {
      email: 'user@email.com',
      id: userId,
      createDateTime: new Date(),
      lastChangedDateTime: new Date(),
      name: 'username',
      password: 'password',
    };

    const todo: Todo = {
      createDateTime: new Date(),
      lastChangedDateTime: new Date(),
      id: Date.now().toString(),
      ...createTodoDTO,
      user,
    };

    const request = {
      user: { id: userId },
    };

    jest.spyOn(MockTodosService, 'createOne').mockReturnValue(todo);

    // act
    const result = await controller.postTodos(request, createTodoDTO);

    // assert
    expect(MockTodosService.createOne).toHaveBeenCalled();
    expect(MockTodosService.createOne).toHaveBeenCalledWith({
      ...createTodoDTO,
      user: userId,
    });
    expect(result).toBe(todo);
  });
});
