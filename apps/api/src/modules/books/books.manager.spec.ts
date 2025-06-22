import { Test, TestingModule } from '@nestjs/testing';
import { BooksManager } from '@api/modules/books/books.manager';
import { PrismaService } from '@api/modules/prisma/prisma.service';
import { CreateBookDto, UpdateBookDto } from '@dto/books/books.dto';
import { Book, Prisma } from '@tools/prisma/generated/client';

describe('BooksManager', () => {
  let manager: BooksManager;

  const mockBook: Book = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Test Book',
    author: 'Test Author',
    description: 'Test Description',
    price: new Prisma.Decimal(19.99),
    pages: 200,
    publisher: 'Test Publisher',
    published: new Date(),
    genre: 'Test Genre',
    inStock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    book: {
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksManager,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    manager = module.get<BooksManager>(BooksManager);
  });

  it('should be defined', () => {
    expect(manager).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const books = [mockBook];
      mockPrismaService.book.findMany.mockResolvedValue(books);

      const result = await manager.findAll();
      expect(result).toEqual(books);
      expect(mockPrismaService.book.findMany).toHaveBeenCalledWith({
        orderBy: {
          createdAt: 'desc',
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a book by id', async () => {
      mockPrismaService.book.findUniqueOrThrow.mockResolvedValue(mockBook);

      const result = await manager.findOne(mockBook.id);
      expect(result).toEqual(mockBook);
      expect(mockPrismaService.book.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: mockBook.id },
      });
    });

    it('should throw PrismaClientKnownRequestError when book is not found', async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'Record not found',
        {
          code: 'P2025',
          clientVersion: '5.0.0',
        },
      );
      mockPrismaService.book.findUniqueOrThrow.mockRejectedValue(prismaError);

      await expect(manager.findOne('non-existent-id')).rejects.toThrow(
        Prisma.PrismaClientKnownRequestError,
      );
    });

    it('should rethrow non-Prisma errors', async () => {
      const error = new Error('Database connection failed');
      mockPrismaService.book.findUniqueOrThrow.mockRejectedValue(error);

      await expect(manager.findOne('some-id')).rejects.toThrow(
        'Database connection failed',
      );
    });
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'New Book',
        author: 'New Author',
        description: 'New Description',
        price: new Prisma.Decimal(29.99),
        pages: 300,
        publisher: 'New Publisher',
        published: new Date(),
        genre: 'New Genre',
        inStock: 20,
      };

      mockPrismaService.book.create.mockResolvedValue({
        ...createBookDto,
        id: mockBook.id,
      });

      const result = await manager.create(createBookDto);
      expect(result).toEqual({ ...createBookDto, id: mockBook.id });
      expect(mockPrismaService.book.create).toHaveBeenCalledWith({
        data: createBookDto,
      });
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const updateBookDto: UpdateBookDto = {
        title: 'Updated Book',
        price: new Prisma.Decimal(39.99),
      };

      mockPrismaService.book.update.mockResolvedValue({
        ...mockBook,
        ...updateBookDto,
      });

      const result = await manager.update(mockBook.id, updateBookDto);
      expect(result).toEqual({ ...mockBook, ...updateBookDto });
      expect(mockPrismaService.book.update).toHaveBeenCalledWith({
        where: { id: mockBook.id },
        data: updateBookDto,
      });
    });

    it('should throw PrismaClientKnownRequestError when updating non-existent book', async () => {
      const updateBookDto: UpdateBookDto = { title: 'Updated Book' };
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'Record not found',
        {
          code: 'P2025',
          clientVersion: '5.0.0',
        },
      );
      mockPrismaService.book.update.mockRejectedValue(prismaError);

      await expect(
        manager.update('non-existent-id', updateBookDto),
      ).rejects.toThrow(Prisma.PrismaClientKnownRequestError);
    });

    it('should rethrow non-Prisma errors', async () => {
      const updateBookDto: UpdateBookDto = { title: 'Updated Book' };
      const error = new Error('Database connection failed');
      mockPrismaService.book.update.mockRejectedValue(error);

      await expect(manager.update('some-id', updateBookDto)).rejects.toThrow(
        'Database connection failed',
      );
    });
  });

  describe('remove', () => {
    it('should remove a book', async () => {
      mockPrismaService.book.delete.mockResolvedValue(mockBook);

      const result = await manager.remove(mockBook.id);
      expect(result).toEqual(mockBook);
      expect(mockPrismaService.book.delete).toHaveBeenCalledWith({
        where: { id: mockBook.id },
      });
    });

    it('should throw PrismaClientKnownRequestError when removing non-existent book', async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'Record not found',
        {
          code: 'P2025',
          clientVersion: '5.0.0',
        },
      );
      mockPrismaService.book.delete.mockRejectedValue(prismaError);

      await expect(manager.remove('non-existent-id')).rejects.toThrow(
        Prisma.PrismaClientKnownRequestError,
      );
    });

    it('should rethrow non-Prisma errors', async () => {
      const error = new Error('Database connection failed');
      mockPrismaService.book.delete.mockRejectedValue(error);

      await expect(manager.remove('some-id')).rejects.toThrow(
        'Database connection failed',
      );
    });
  });
});
