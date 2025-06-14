import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { CreateBookDto } from '../src/modules/books/books.dto';
import { Express } from 'express';
import { Prisma } from '@prisma/index';

describe('BooksController (e2e)', () => {
  let app: INestApplication;

  const testBook: CreateBookDto = {
    title: 'Test Book',
    author: 'Test Author',
    description: 'Test Description',
    price: new Prisma.Decimal(19.99),
    pages: 200,
    publisher: 'Test Publisher',
    published: new Date(),
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
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /books', () => {
    it('should create a new book', () => {
      const createdBook = { id: mockId, ...testBook };
      mockPrismaService.book.create.mockResolvedValue(createdBook);

      return request(app.getHttpServer() as Express)
        .post('/books')
        .send(testBook)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.title).toBe(testBook.title);
          expect(res.body.author).toBe(testBook.author);
        });
    });

    it('should validate required fields', () => {
      return request(app.getHttpServer() as Express)
        .post('/books')
        .send({})
        .expect(400);
    });
  });

  describe('GET /books', () => {
    it('should return an array of books', async () => {
      const books = [{ id: mockId, ...testBook }];
      mockPrismaService.book.findMany.mockResolvedValue(books);

      return request(app.getHttpServer() as Express)
        .get('/books')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(1);
          expect(res.body[0].id).toBe(mockId);
        });
    });
  });

  describe('GET /books/:id', () => {
    it('should return a book by id', async () => {
      const book = { id: mockId, ...testBook };
      mockPrismaService.book.findUniqueOrThrow.mockResolvedValue(book);

      return request(app.getHttpServer() as Express)
        .get(`/books/${mockId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(mockId);
          expect(res.body.title).toBe(testBook.title);
        });
    });

    it('should return 404 for non-existent book', () => {
      mockPrismaService.book.findUniqueOrThrow.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Record not found', {
          code: 'P2025',
          clientVersion: '5.0.0',
        }),
      );

      return request(app.getHttpServer() as Express)
        .get(`/books/${mockId}`)
        .expect(404);
    });
  });

  describe('PUT /books/:id', () => {
    it('should update a book', async () => {
      const updateData = { title: 'Updated Title' };
      const updatedBook = { id: mockId, ...testBook, ...updateData };
      mockPrismaService.book.update.mockResolvedValue(updatedBook);

      return request(app.getHttpServer() as Express)
        .put(`/books/${mockId}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(mockId);
          expect(res.body.title).toBe(updateData.title);
        });
    });

    it('should return 404 when updating non-existent book', () => {
      mockPrismaService.book.update.mockRejectedValue(prismaError);

      return request(app.getHttpServer() as Express)
        .put(`/books/${mockId}`)
        .send({ title: 'Updated Title' })
        .expect(404);
    });
  });

  describe('DELETE /books/:id', () => {
    it('should delete a book', async () => {
      const deletedBook = { id: mockId, ...testBook };
      mockPrismaService.book.delete.mockResolvedValue(deletedBook);

      return request(app.getHttpServer() as Express)
        .delete(`/books/${mockId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(mockId);
        });
    });

    it('should return 404 when deleting non-existent book', () => {
      mockPrismaService.book.delete.mockRejectedValue(prismaError);

      return request(app.getHttpServer() as Express)
        .delete(`/books/${mockId}`)
        .expect(404);
    });
  });
});
