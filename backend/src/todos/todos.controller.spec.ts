import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodoFilter, TodosService } from './todos.service';
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
  const userId = 'user-id';
  const user: Users = {
    email: 'user@email.com',
    id: userId,
    createDateTime: new Date(),
    lastChangedDateTime: new Date(),
    name: 'username',
    password: 'password',
  };
  const request = { user };

  const todos: Todo[] = [
    {
      createDateTime: new Date(),
      lastChangedDateTime: new Date(),
      id: Date.now().toString(),
      description: 'description1',
      title: 'title1',
      status: 'todo',
      user,
    },
    {
      createDateTime: new Date(),
      lastChangedDateTime: new Date(),
      id: Date.now().toString(),
      description: 'description2',
      title: 'title2',
      status: 'todo',
      user,
    },
    {
      createDateTime: new Date(),
      lastChangedDateTime: new Date(),
      id: Date.now().toString(),
      description: 'description2',
      title: 'title2',
      status: 'inProgress',
      user,
    },
  ];

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

  it('should return user todos', async () => {
    // arrange
    jest.spyOn(MockTodosService, 'getAllForUser').mockReturnValue(todos);

    // act
    const unfilteredResult = await controller.getTodos(request);

    // assert
    expect(MockTodosService.getAllForUser).toHaveBeenCalled();
    expect(MockTodosService.getAllForUser).toHaveBeenCalledWith(
      user,
      undefined,
      undefined,
    );
    expect(unfilteredResult).toBe(todos);
  });

  it('should filter todos', async () => {
    // arrange
    const filter: TodoFilter = {
      status: 'todo',
    };

    const filteredTodos = todos.filter(({ status: s }) => s === filter.status);

    jest
      .spyOn(MockTodosService, 'getAllForUser')
      .mockReturnValue(filteredTodos);

    // act
    const result = await controller.getTodos(request, JSON.stringify(filter));

    // assert
    expect(result).toBe(filteredTodos);
    expect(MockTodosService.getAllForUser).toHaveBeenLastCalledWith(
      user,
      filter,
      undefined,
    );
  });
});
