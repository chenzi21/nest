# NestJS Book Management API

A robust, secure REST API built with NestJS for managing a book collection. This project demonstrates modern backend development practices with comprehensive security, monitoring, and containerization.

## 🚀 Features

- **Book Management**: Full CRUD operations for books
- **Data Validation**: Using class-validator for request validation
- **API Documentation**: Auto-generated Swagger/OpenAPI documentation
- **Database Integration**: PostgreSQL with Prisma ORM
- **Type Safety**: Full TypeScript support
- **Security**: Helmet, CORS, rate limiting, and input validation
- **Monitoring**: Health checks and structured logging
- **Containerization**: Secure Docker setup with internal networking
- **Configuration Management**: Environment validation with Joi
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
- **Security**: Helmet, Throttler, CORS

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

3. **Set up environment variables**

   Create your environment files based on the examples in `DOCKER_SECURITY.md`:

   ```bash
   # Development
   NODE_ENV=development
   PORT=8080
   DATABASE_URL=postgresql://postgres:prisma@db:5432/postgres?schema=public
   CORS_ORIGINS=http://web:3000,http://localhost:3000
   ```

4. **Start the development environment**

   ```bash
   docker compose -f docker-compose.dev.yml up
   ```

5. **Generate Prisma client and run migrations**
   ```bash
   pnpm prisma:generate
   pnpm prisma:migrate
   ```

## 🌐 Service URLs

### Development

- **Web App**: `http://localhost:3000`
- **API**: `http://localhost:8080`
- **API Documentation**: `http://localhost:8080/api`
- **Health Check**: `http://localhost:8080/health`

### Production

- **Web App**: `http://localhost:3000` (only external access)
- **API & Database**: Internal network only (secure)

## 📚 API Endpoints

### Books

- `GET /books` - Get all books
- `GET /books/:id` - Get a specific book
- `POST /books` - Create a new book
- `PUT /books/:id` - Update a book
- `DELETE /books/:id` - Delete a book

### Health & Monitoring

- `GET /health` - Basic health check
- `GET /health/db` - Database health check
- `GET /health/detailed` - Detailed system health

## 🏗️ Project Structure

```
├── apps/
│   ├── api/               # NestJS API application
│   │   ├── src/
│   │   │   ├── config/    # Configuration management
│   │   │   ├── modules/   # Feature modules
│   │   │   │   ├── books/ # Book management
│   │   │   │   ├── health/# Health checks
│   │   │   │   └── prisma/# Database service
│   │   │   └── main.ts    # Application bootstrap
│   │   └── docker/        # Docker configuration
│   └── web/               # Next.js web application
├── tools/
│   └── prisma/           # Database schema & migrations
├── docker-compose.dev.yml # Development environment
├── docker-compose.prod.yml# Production environment
└── DOCKER_SECURITY.md     # Security documentation
```

## 🔧 Development

### Database Operations

```bash
# Generate Prisma client
pnpm prisma:generate

# Create and run migrations
pnpm prisma:migrate

# Open Prisma Studio
pnpm prisma:studio
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

### Code Quality

```bash
# Linting
pnpm lint

# Format code
pnpm format
```

## 🐳 Docker & Security

### Secure Network Architecture

This project implements **Zero Trust** networking:

- **Development**: API accessible externally for testing, database internal only
- **Production**: Only web app exposed, API and database completely internal
- **Network Isolation**: All services communicate over private Docker network

### Docker Configurations

- **Development** (`docker-compose.dev.yml`): Hot-reloading, external API access
- **Production** (`docker-compose.prod.yml`): Secure, internal-only communication

See `DOCKER_SECURITY.md` for detailed security documentation.

## 📝 Environment Configuration

### Required Environment Variables

```bash
# Application
NODE_ENV=development|production|test
PORT=8080

# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Security
CORS_ORIGINS=http://localhost:3000,http://web:3000

# Production only
DB_USER=secure_username
DB_PASSWORD=secure_password
DB_NAME=production_database
```

## 🔐 Security Features

- **Helmet**: Security headers
- **CORS**: Configurable cross-origin resource sharing
- **Rate Limiting**: Configurable request throttling
- **Input Validation**: Comprehensive request validation
- **Network Isolation**: Docker internal networking
- **Environment Validation**: Joi schema validation
- **Graceful Shutdown**: Proper application lifecycle management

## 📊 Monitoring & Health Checks

- **Application Health**: `/health` endpoint
- **Database Health**: `/health/db` endpoint
- **Detailed Metrics**: `/health/detailed` endpoint
- **Docker Health Checks**: Container-level monitoring
- **Structured Logging**: Enhanced error tracking

## 🚀 Production Deployment

1. **Set environment variables**:

   ```bash
   export DATABASE_URL="your-production-db-url"
   export DB_PASSWORD="your-secure-password"
   ```

2. **Deploy with production compose**:

   ```bash
   docker compose -f docker-compose.prod.yml up -d
   ```

3. **Verify health**:
   ```bash
   curl http://localhost:3000/health
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the existing code style and patterns
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the UNLICENSED License.
