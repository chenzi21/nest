import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BooksManager } from '@api/modules/books/books.manager';
import { CreateBookDto, UpdateBookDto } from '@api/modules/books/books.dto';
import { HandleTransformPrismaError } from '@api/modules/prisma/prisma-error.decorator';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

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
  @ApiBody({ type: CreateBookDto })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksManager.create(createBookDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiBody({ type: UpdateBookDto })
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
