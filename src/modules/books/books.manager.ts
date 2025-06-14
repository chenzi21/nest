import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class BooksManager {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.book.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
