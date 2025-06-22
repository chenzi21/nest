import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  UsePipes,
} from '@nestjs/common';
import { BooksManager } from '@api/modules/books/books.manager';
import {
  CreateBookDto,
  UpdateBookDto,
  CreateBookSchema,
  UpdateBookSchema,
} from '@dto/books/books.dto';
import { HandleTransformPrismaError } from '@api/modules/prisma/prisma-error.decorator';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { ZodValidationPipe } from '@api/common/pipes/zod-validation.pipe';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksManager: BooksManager) {}

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  findAll() {
    return this.booksManager.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @HandleTransformPrismaError()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksManager.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiBody({
    description: 'Book creation data',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        pages: { type: 'number', minimum: 1 },
        publisher: { type: 'string' },
        published: { type: 'string', format: 'date' },
        genre: { type: 'string' },
        inStock: { type: 'number', minimum: 0 },
      },
    },
  })
  @UsePipes(new ZodValidationPipe(CreateBookSchema))
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksManager.create(createBookDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiBody({
    description: 'Book update data',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        pages: { type: 'number', minimum: 1 },
        publisher: { type: 'string' },
        published: { type: 'string', format: 'date' },
        genre: { type: 'string' },
        inStock: { type: 'number', minimum: 0 },
      },
    },
  })
  @UsePipes(new ZodValidationPipe(UpdateBookSchema))
  @HandleTransformPrismaError()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksManager.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @HandleTransformPrismaError()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksManager.remove(id);
  }
}
