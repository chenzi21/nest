import { z } from 'zod';
import { Prisma } from '@tools/prisma/generated/client';

export const BookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  description: z.string().min(1, 'Description is required'),
  price: z
    .union([z.number(), z.instanceof(Prisma.Decimal)])
    .transform((val) => new Prisma.Decimal(val)),
  pages: z.number().min(1, 'Pages must be at least 1'),
  publisher: z.string().min(1, 'Publisher is required'),
  published: z.coerce.date(),
  genre: z.string().min(1, 'Genre is required'),
  inStock: z.number().min(0, 'Stock cannot be negative'),
});

export const CreateBookSchema = BookSchema;
export const UpdateBookSchema = BookSchema.partial();

export type CreateBookDto = z.infer<typeof CreateBookSchema>;
export type UpdateBookDto = z.infer<typeof UpdateBookSchema>;
