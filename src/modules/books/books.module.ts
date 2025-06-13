import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { BooksManager } from './books.manager';

@Module({
  imports: [PrismaModule],
  providers: [BooksManager],
  exports: [BooksManager],
})
export class BooksModule {}
