import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsDecimal,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Prisma } from '@tools/prisma/generated/client';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateBookDto implements Prisma.BookCreateInput {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDecimal()
  @ApiProperty({ type: 'integer' })
  price: Prisma.Decimal;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  pages: number;

  @IsNotEmpty()
  @IsString()
  publisher: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  published: Date;

  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  inStock: number;
}

export class UpdateBookDto
  extends PartialType(CreateBookDto)
  implements Prisma.BookUpdateInput {}
