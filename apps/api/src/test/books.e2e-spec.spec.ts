import { AppModule } from '@api/modules/app.module';
import { PrismaService } from '@api/modules/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@tools/prisma/generated/client';
import { BooksController } from '@api/modules/books/books.controller';

describe('BooksController (e2e)', () => {
  let controller: BooksController;
  let module: TestingModule;

  const testBook = {
    title: 'Test Book',
    author: 'Test Author',
    description: 'Test Description',
    price: new Prisma.Decimal(19.99),
    pages: 200,
    publisher: 'Test Publisher',
    published: new Date('2023-01-01'),
    genre: 'Test Genre',
    inStock: 10,
  };

  const mockId = '123e4567-e89b-12d3-a456-426614174000';
  const mockPrismaService = {
    book: {
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const prismaError = new Prisma.PrismaClientKnownRequestError(
    'Record not found',
    {
      code: 'P2025',
      clientVersion: '5.0.0',
    },
  );

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    controller = module.get<BooksController>(BooksController);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('POST /books', () => {
    it('should create a new book', async () => {
      const testBookData = {
        title: 'Test Book',
        author: 'Test Author',
        description: 'Test Description',
        price: new Prisma.Decimal(19.99),
        pages: 200,
        publisher: 'Test Publisher',
        published: new Date('2023-01-01'),
        genre: 'Test Genre',
        inStock: 10,
      };

      const createdBook = { ...testBookData, id: mockId };
      mockPrismaService.book.create.mockResolvedValue(createdBook);

      const result = await controller.create(testBookData);

      expect(result).toHaveProperty('id');
      expect(result.title).toBe(testBookData.title);
      expect(result.author).toBe(testBookData.author);
    });
  });

  describe('GET /books', () => {
    it('should return an array of books', async () => {
      const books = [{ id: mockId, ...testBook }];
      mockPrismaService.book.findMany.mockResolvedValue(books);

      const result = await controller.findAll();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(mockId);
    });
  });

  describe('GET /books/:id', () => {
    it('should return a book by id', async () => {
      const book = { id: mockId, ...testBook };
      mockPrismaService.book.findUniqueOrThrow.mockResolvedValue(book);

      const result = await controller.findOne(mockId);

      expect(result.id).toBe(mockId);
      expect(result.title).toBe(testBook.title);
    });

    it('should throw error for non-existent book', async () => {
      mockPrismaService.book.findUniqueOrThrow.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Record not found', {
          code: 'P2025',
          clientVersion: '5.0.0',
        }),
      );

      await expect(controller.findOne(mockId)).rejects.toThrow();
    });
  });

  describe('PUT /books/:id', () => {
    it('should update a book', async () => {
      const updateData = { title: 'Updated Title' };
      const updatedBook = { id: mockId, ...testBook, ...updateData };
      mockPrismaService.book.update.mockResolvedValue(updatedBook);

      const result = await controller.update(mockId, updateData);

      expect(result.id).toBe(mockId);
      expect(result.title).toBe(updateData.title);
    });

    it('should throw error when updating non-existent book', async () => {
      mockPrismaService.book.update.mockRejectedValue(prismaError);

      await expect(
        controller.update(mockId, { title: 'Updated Title' }),
      ).rejects.toThrow();
    });
  });

  describe('DELETE /books/:id', () => {
    it('should delete a book', async () => {
      const deletedBook = { id: mockId, ...testBook };
      mockPrismaService.book.delete.mockResolvedValue(deletedBook);

      const result = await controller.remove(mockId);

      expect(result.id).toBe(mockId);
    });

    it('should throw error when deleting non-existent book', async () => {
      mockPrismaService.book.delete.mockRejectedValue(prismaError);

      await expect(controller.remove(mockId)).rejects.toThrow();
    });
  });
});
