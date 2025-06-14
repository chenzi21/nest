import { Module } from '@nestjs/common';
import { BooksManager } from './books.manager';
import { BooksController } from './books.controller';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BooksController],
  providers: [BooksManager],
  exports: [BooksManager],
})
export class BooksModule {}
