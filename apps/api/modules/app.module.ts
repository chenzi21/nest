import { Module } from '@nestjs/common';
import { BooksModule } from '@api/modules/books/books.module';

@Module({
  imports: [BooksModule],
})
export class AppModule {}
