import { Injectable } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from '@dto/books/books.dto';
import { PrismaService } from '@api/modules/prisma/prisma.service';

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

  async findOne(id: string) {
    return this.prisma.book.findUniqueOrThrow({
      where: { id },
    });
  }

  async create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({
      data: createBookDto,
    });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  async remove(id: string) {
    return this.prisma.book.delete({
      where: { id },
    });
  }
}
