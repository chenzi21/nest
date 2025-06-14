import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateBookDto, UpdateBookDto } from './books.dto';
import { HandleTransformPrismaError } from '@prisma/prisma-error.decorator';

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

  @HandleTransformPrismaError()
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

  @HandleTransformPrismaError()
  async update(id: string, updateBookDto: UpdateBookDto) {
    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  @HandleTransformPrismaError()
  async remove(id: string) {
    return this.prisma.book.delete({
      where: { id },
    });
  }
}
