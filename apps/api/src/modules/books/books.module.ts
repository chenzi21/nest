import { Module } from '@nestjs/common';
import { BooksManager } from '@api/modules/books/books.manager';
import { BooksController } from '@api/modules/books/books.controller';
import { PrismaModule } from '@api/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BooksController],
  providers: [BooksManager],
  exports: [BooksManager],
})
export class BooksModule {}
