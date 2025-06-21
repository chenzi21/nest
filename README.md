# NestJS Book Management API

A robust REST API built with NestJS for managing a book collection. This project demonstrates modern backend development practices and integrates several powerful tools and libraries.

## 🚀 Features

- **Book Management**: Full CRUD operations for books
- **Data Validation**: Using class-validator for request validation
- **API Documentation**: Auto-generated Swagger/OpenAPI documentation
- **Database Integration**: PostgreSQL with Prisma ORM
- **Type Safety**: Full TypeScript support
- **Containerization**: Docker setup for both development and production
- **Package Management**: Using pnpm for faster, more efficient dependency management

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **API Documentation**: Swagger/OpenAPI
- **Containerization**: Docker
- **Package Manager**: pnpm
- **Validation**: class-validator & class-transformer

## 📋 Prerequisites

- Docker and Docker Compose
- pnpm (for local development)
- Node.js (for local development)

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/chenzi21/nest.git
   cd nest
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development environment**
   ```bash
   docker compose -f docker-compose.dev.yml up
   ```

The API will be available at `http://localhost:8080`
API documentation (Swagger UI) will be available at `http://localhost:8080/api`

## 📚 API Endpoints

### Books

- `GET /books` - Get all books
- `GET /books/:id` - Get a specific book
- `POST /books` - Create a new book
- `PUT /books/:id` - Update a book
- `DELETE /books/:id` - Delete a book

## 🏗️ Project Structure

```
src/
├── modules/
│   └── books/
│       ├── books.controller.ts
│       ├── books.dto.ts
│       ├── books.manager.ts
│       └── books.module.ts
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
└── main.ts
```

## 🔧 Development

### Database Migrations

```bash
# Generate Prisma client
pnpm prisma:generate

# Run migrations
pnpm prisma:migrate
```

### Running Tests

```bash
# Unit tests
pnpm test

# e2e tests
pnpm test:e2e

# Test coverage
pnpm test:cov
```

## 🐳 Docker

The project includes two Docker configurations:

- **Development** (`docker-compose.dev.yml`): Includes hot-reloading and development tools
- **Production** (`docker-compose.prod.yml`): Optimized for production deployment

## 📝 Environment Variables

The following environment variables are used: (in docker compose)

- `PORT`: API server port (default: 8080)
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Environment (development/production)

## 🔐 Security

- Input validation using class-validator
- UUID validation for resource IDs
- Type safety with TypeScript
