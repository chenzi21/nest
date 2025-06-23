import { createZodDto } from '@anatine/zod-nestjs';
import { CreateBookSchema, UpdateBookSchema } from '@schema/books/books.schema';

export class CreateBookDto extends createZodDto(CreateBookSchema) {}
export class UpdateBookDto extends createZodDto(UpdateBookSchema) {}
