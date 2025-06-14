import { Injectable } from '@nestjs/common';
import { BooksManager } from './modules/books/books.manager';

@Injectable()
export class AppService {
  constructor(private readonly booksManager: BooksManager) {}

  getBooks() {
    return this.booksManager.findAll();
  }
}
