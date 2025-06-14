import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksManager } from './modules/books/books.manager';
import { PrismaService } from 'nestjs-prisma';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const mockPrismaService = {
      book: {
        findMany: jest.fn().mockResolvedValue([]),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        BooksManager,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return an empty array', async () => {
      expect(await appController.getBooks()).toEqual([]);
    });
  });
});
