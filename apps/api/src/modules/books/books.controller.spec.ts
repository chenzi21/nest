import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from '@api/modules/books/books.controller';
import { BooksManager } from '@api/modules/books/books.manager';
import { CreateBookDto, UpdateBookDto } from '@schema/books/books.schema';
import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@tools/prisma/generated/client';

describe('BooksController', () => {
  let controller: BooksController;

  const mockBook = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Test Book',
    author: 'Test Author',
    description: 'Test Description',
    price: 19.99,
    pages: 200,
    publisher: 'Test Publisher',
    published: new Date(),
    genre: 'Test Genre',
    inStock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockBooksManager = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksManager,
          useValue: mockBooksManager,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const books = [mockBook];
      mockBooksManager.findAll.mockResolvedValue(books);

      const result = await controller.findAll();
      expect(result).toEqual(books);
      expect(mockBooksManager.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a book by id', async () => {
      mockBooksManager.findOne.mockResolvedValue(mockBook);

      const result = await controller.findOne(mockBook.id);
      expect(result).toEqual(mockBook);
      expect(mockBooksManager.findOne).toHaveBeenCalledWith(mockBook.id);
    });

    it('should throw NotFoundException when book is not found', async () => {
      mockBooksManager.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
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

      mockBooksManager.create.mockResolvedValue({
        ...createBookDto,
        id: mockBook.id,
      });

      const result = await controller.create(createBookDto);
      expect(result).toEqual({ ...createBookDto, id: mockBook.id });
      expect(mockBooksManager.create).toHaveBeenCalledWith(createBookDto);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const updateBookDto: UpdateBookDto = {
        title: 'Updated Book',
        price: new Prisma.Decimal(39.99),
      };

      mockBooksManager.update.mockResolvedValue({
        ...mockBook,
        ...updateBookDto,
      });

      const result = await controller.update(mockBook.id, updateBookDto);
      expect(result).toEqual({ ...mockBook, ...updateBookDto });
      expect(mockBooksManager.update).toHaveBeenCalledWith(
        mockBook.id,
        updateBookDto,
      );
    });

    it('should throw NotFoundException when updating non-existent book', async () => {
      const updateBookDto: UpdateBookDto = { title: 'Updated Book' };
      mockBooksManager.update.mockRejectedValue(new NotFoundException());

      await expect(
        controller.update('non-existent-id', updateBookDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a book', async () => {
      mockBooksManager.remove.mockResolvedValue(mockBook);

      const result = await controller.remove(mockBook.id);
      expect(result).toEqual(mockBook);
      expect(mockBooksManager.remove).toHaveBeenCalledWith(mockBook.id);
    });

    it('should throw NotFoundException when removing non-existent book', async () => {
      mockBooksManager.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
