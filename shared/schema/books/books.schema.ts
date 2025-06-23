import { z } from 'zod';
import { Book as PrismaBook } from '@tools/prisma/generated/client';

export const BookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  pages: z.number().int().min(1, 'Pages must be at least 1'),
  publisher: z.string().min(1, 'Publisher is required'),
  published: z.coerce.date(),
  genre: z.string().min(1, 'Genre is required'),
  inStock: z.number().int().min(0, 'Stock cannot be negative'),
});

export const createBookSchema = BookSchema;

export const updateBookSchema = BookSchema.partial();

export type Book = PrismaBook;
export type CreateBookSchema = z.infer<typeof createBookSchema>;
export type UpdateBookSchema = z.infer<typeof updateBookSchema>;
