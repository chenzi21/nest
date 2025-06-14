import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsDecimal,
  Min,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/index';

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
  @Type(() => Prisma.Decimal)
  @IsDecimal()
  price: number;

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

export class UpdateBookDto implements Prisma.BookUpdateInput {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Prisma.Decimal)
  @IsDecimal()
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  pages?: number;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  published?: Date;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  inStock?: number;
}
