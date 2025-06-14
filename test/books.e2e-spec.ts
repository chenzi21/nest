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
  let prismaService: PrismaService;

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

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prismaService = app.get<PrismaService>(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    // Clean up the database
    await prismaService.book.deleteMany();
    await app.close();
  });

  describe('POST /books', () => {
    it('should create a new book', () => {
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
      // Create a book first
      await request(app.getHttpServer() as Express)
        .post('/books')
        .send(testBook)
        .expect(201);

      return request(app.getHttpServer() as Express)
        .get('/books')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('id');
        });
    });
  });

  describe('GET /books/:id', () => {
    it('should return a book by id', async () => {
      // Create a book first
      const createdBook = await request(app.getHttpServer() as Express)
        .post('/books')
        .send(testBook)
        .expect(201);

      return request(app.getHttpServer() as Express)
        .get(`/books/${createdBook.body.id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(createdBook.body.id);
          expect(res.body.title).toBe(testBook.title);
        });
    });

    it('should return 404 for non-existent book', () => {
      return request(app.getHttpServer() as Express)
        .get('/books/non-existent-id')
        .expect(404);
    });
  });

  describe('PUT /books/:id', () => {
    it('should update a book', async () => {
      // Create a book first
      const createdBook = await request(app.getHttpServer() as Express)
        .post('/books')
        .send(testBook)
        .expect(201);

      const updateData = {
        title: 'Updated Title',
        price: 29.99,
      };

      return request(app.getHttpServer() as Express)
        .put(`/books/${createdBook.body.id}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(createdBook.body.id);
          expect(res.body.title).toBe(updateData.title);
          expect(res.body.price).toBe(updateData.price);
        });
    });

    it('should return 404 when updating non-existent book', () => {
      return request(app.getHttpServer() as Express)
        .put('/books/non-existent-id')
        .send({ title: 'Updated Title' })
        .expect(404);
    });
  });

  describe('DELETE /books/:id', () => {
    it('should delete a book', async () => {
      // Create a book first
      const createdBook = await request(app.getHttpServer() as Express)
        .post('/books')
        .send(testBook)
        .expect(201);

      await request(app.getHttpServer() as Express)
        .delete(`/books/${createdBook.body.id}`)
        .expect(200);

      // Verify the book is deleted
      return request(app.getHttpServer() as Express)
        .get(`/books/${createdBook.body.id}`)
        .expect(404);
    });

    it('should return 404 when deleting non-existent book', () => {
      return request(app.getHttpServer() as Express)
        .delete('/books/non-existent-id')
        .expect(404);
    });
  });
});
