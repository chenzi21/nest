import { createZodDto } from '@anatine/zod-nestjs';
import { createBookSchema, updateBookSchema } from '@schema/books/books.schema';

export class CreateBookDto extends createZodDto(createBookSchema) {}
export class UpdateBookDto extends createZodDto(updateBookSchema) {}
