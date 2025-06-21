/* eslint-disable */
export default async () => {
  const t = {
    ['../prisma/generated/client/runtime/library']: await import(
      '@tools/prisma/generated/client/runtime/library'
    ),
  };
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('./modules/books/books.dto'),
          {
            CreateBookDto: {
              title: { required: true, type: () => String },
              author: { required: true, type: () => String },
              description: { required: true, type: () => String },
              price: {
                required: true,
                type: () =>
                  t['../prisma/generated/client/runtime/library'].Decimal,
              },
              pages: { required: true, type: () => Number, minimum: 1 },
              publisher: { required: true, type: () => String },
              published: { required: true, type: () => Date },
              genre: { required: true, type: () => String },
              inStock: { required: true, type: () => Number, minimum: 0 },
            },
            UpdateBookDto: {
              title: { required: false, type: () => String },
              author: { required: false, type: () => String },
              description: { required: false, type: () => String },
              price: {
                required: false,
                type: () =>
                  t['../prisma/generated/client/runtime/library'].Decimal,
              },
              pages: { required: false, type: () => Number, minimum: 1 },
              publisher: { required: false, type: () => String },
              published: { required: false, type: () => Date },
              genre: { required: false, type: () => String },
              inStock: { required: false, type: () => Number, minimum: 0 },
            },
          },
        ],
      ],
      controllers: [
        [, { AppController: { getBooks: {} } }],
        [
          import('./modules/books/books.controller'),
          {
            BooksController: {
              findAll: {},
              findOne: {},
              create: {},
              update: {},
              remove: {},
            },
          },
        ],
      ],
    },
  };
};
