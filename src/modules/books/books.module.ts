import { Module } from '@nestjs/common';
import { BooksManager } from './books.manager';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BooksManager],
  exports: [BooksManager],
})
export class BooksModule {}
