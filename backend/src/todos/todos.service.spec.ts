import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { Todo } from 'src/models/todos.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from 'src/models/users.entity';
import { mockRepositoryFactory } from 'src/testing-helpers';
import { Repository } from 'typeorm';

describe('TodosService', () => {
  let service: TodosService;
  let repository: Repository<Todo>;
  const userId = 'user-id';

  const user: Users = {
    email: 'user@email.com',
    id: userId,
    createDateTime: new Date(),
    lastChangedDateTime: new Date(),
    name: 'username',
    password: 'password',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useFactory: mockRepositoryFactory,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    repository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return todos', async () => {
    // arrange
    const todos: Todo[] = [
      {
        id: Date.now().toString(),
        createDateTime: new Date(),
        lastChangedDateTime: new Date(),
        description: 'description',
        status: 'todo',
        title: 'title',
        user,
      },
    ];

    jest.spyOn(repository, 'createQueryBuilder').mockImplementation(
      () =>
        ({
          andWhere: jest.fn().mockReturnThis(),
          addSelect: jest.fn().mockReturnThis(),
          getMany: jest.fn().mockReturnValue(todos),
        }) as any,
    );

    //act
    const result = await service.getAllForUser(user);

    // assert
    expect(result).toBe(todos);
  });
});
