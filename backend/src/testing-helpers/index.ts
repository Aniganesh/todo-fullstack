export const mockRepositoryFactory = () => {
  const mockDeleteSingleton = jest.fn().mockReturnThis();
  const mockExecuteSingleton = jest.fn().mockReturnThis();
  const mockFromSingleton = jest.fn().mockReturnThis();
  const mockGetManySingleton = jest.fn().mockReturnThis();
  const mockGetOneSingleton = jest.fn().mockReturnThis();
  const mockInnerJoinSingleton = jest.fn().mockReturnThis();
  const mockInnerJoinAndSelectSingleton = jest.fn().mockReturnThis();
  const mockOrderBySingleton = jest.fn().mockReturnThis();
  const mockWhereSingleton = jest.fn().mockReturnThis();
  const mockAddSelectSingleton = jest.fn().mockReturnThis();
  const mockAddGroupBySingleton = jest.fn().mockReturnThis();

  return {
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    find: jest.fn(),
    count: jest.fn(),
    average: jest.fn(),
    clear: jest.fn(),
    countBy: jest.fn(),
    decrement: jest.fn(),
    exists: jest.fn(),
    existsBy: jest.fn(),
    createQueryBuilder: () => ({
      delete: mockDeleteSingleton,
      execute: mockExecuteSingleton,
      from: mockFromSingleton,
      getMany: mockGetManySingleton,
      getOne: mockGetOneSingleton,
      innerJoin: mockInnerJoinSingleton,
      innerJoinAndSelect: mockInnerJoinAndSelectSingleton,
      orderBy: mockOrderBySingleton,
      where: mockWhereSingleton,
      andWhere: mockWhereSingleton,
      addSelect: mockAddSelectSingleton,
      addGroupBy: mockAddGroupBySingleton,
    }),
  };
};
