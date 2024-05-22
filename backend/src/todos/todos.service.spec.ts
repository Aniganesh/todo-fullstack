import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { Todo } from 'src/models/todos.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(async () => {
    const mockRepository: Partial<Repository<Todo>> = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
      create: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
