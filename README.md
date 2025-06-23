# 📚 Book Management System

A modern, full-stack book management system built with **NestJS** and **Next.js**. This project demonstrates enterprise-level development practices with a beautiful, responsive UI and a robust, secure backend API.

## ✨ Features

### 🎨 **Beautiful Web Interface**

- **📊 Interactive Data Table**: Powerful books table with sorting, filtering, and pagination
- **🔍 Real-time Search**: Global search across all book fields
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🌙 Dark Mode**: Built-in dark/light theme support
- **⚡ Live Updates**: Real-time data synchronization with React Query
- **🎯 Professional UI**: Modern interface built with TailwindCSS

### 🛠️ **Table Features**

- **Sortable Columns**: Click any header to sort (title, author, price, pages, etc.)
- **Advanced Filtering**: Global search + individual column filters
- **Smart Pagination**: Navigate through large datasets with customizable page sizes (5, 10, 20, 50)
- **Visual Indicators**: Color-coded stock levels, price highlighting, genre badges
- **Loading States**: Smooth loading animations and error handling
- **Empty States**: Helpful messages when no data matches filters

### 🔧 **Backend API**

- **Full CRUD Operations**: Complete book management functionality
- **Data Validation**: Comprehensive validation using Zod schemas
- **API Documentation**: Auto-generated Swagger/OpenAPI documentation
- **Type Safety**: Full TypeScript support with Prisma integration
- **Security**: Helmet, CORS, rate limiting, and input validation
- **Health Monitoring**: Comprehensive health checks and structured logging

## 🚀 Tech Stack

### **Frontend**

- **Framework**: Next.js 15 with React 19
- **Styling**: TailwindCSS with custom components
- **State Management**: React Query (@tanstack/react-query)
- **Table**: @tanstack/react-table for advanced data table features
- **Type Safety**: Full TypeScript integration
- **Build Tool**: Turbopack for lightning-fast development

### **Backend**

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Zod schemas with automatic validation
- **Documentation**: Swagger/OpenAPI auto-generation
- **Security**: Comprehensive security middleware stack

### **Infrastructure**

- **Containerization**: Docker with multi-stage builds
- **Package Management**: pnpm for efficient dependency management
- **Development**: Hot-reloading with file watching
- **Database**: PostgreSQL with automatic migrations

## 📋 Prerequisites

- **Docker & Docker Compose** (recommended)
- **Node.js 18+** (for local development)
- **pnpm 8+** (package manager)

## 🚀 Quick Start

### **Option 1: Docker (Recommended)**

1. **Clone and start the entire stack**:

   ```bash
   git clone https://github.com/chenzi21/nest.git
   cd nest
   docker compose -f docker-compose.dev.yml up --build
   ```

2. **Access the applications**:
   - **📱 Web App**: http://localhost:3000
   - **🔧 API**: http://localhost:8080
   - **📚 API Docs**: http://localhost:8080/api

### **Option 2: Local Development**

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Set up environment variables**:

   ```bash
   # Development
   NODE_ENV=development
   PORT=8080
   DATABASE_URL=postgresql://postgres:prisma@localhost:5432/postgres
   CORS_ORIGINS=http://localhost:3000
   ```

3. **Start services**:

   ```bash
   # Terminal 1: Start API
   pnpm start:api

   # Terminal 2: Start Web App
   pnpm start:web
   ```

## 🌐 Application URLs

### **Development**

- **🎨 Web Interface**: `http://localhost:3000` - Beautiful book management UI
- **⚙️ API Server**: `http://localhost:8080` - RESTful API endpoints
- **📖 API Documentation**: `http://localhost:8080/api` - Interactive Swagger docs
- **🏥 Health Check**: `http://localhost:8080/health` - API health status

### **Production**

- **🌍 Web App**: External access only (port 3000)
- **🔒 API & Database**: Internal network only (secure architecture)

## 📚 API Endpoints

### **Books Management**

- `GET /books` - Get all books with sorting and filtering
- `GET /books/:id` - Get a specific book by ID
- `POST /books` - Create a new book
- `PUT /books/:id` - Update an existing book
- `DELETE /books/:id` - Delete a book

### **Health & Monitoring**

- `GET /health` - Basic application health check
- `GET /health/db` - Database connectivity check
- `GET /health/detailed` - Comprehensive system metrics

## 🎯 Key UI Features

### **📊 Advanced Data Table**

```typescript
// Powerful sorting, filtering, and pagination
- Click column headers to sort data
- Type in search box for global filtering
- Use pagination controls to navigate
- Adjust page size (5, 10, 20, 50 items)
- Responsive design for all screen sizes
```

### **🔄 Real-time Updates**

```typescript
// Automatic data synchronization
- Add new books via "Add Sample Book" button
- Table updates automatically without refresh
- Optimistic updates for better UX
- Error handling with user-friendly messages
```

### **🎨 Visual Design**

```typescript
// Professional, modern interface
- Clean typography with Geist font family
- Intuitive icons and visual indicators
- Smooth animations and transitions
- Consistent color scheme and spacing
```

## 🏗️ Project Structure

```
📁 nest/
├── 📁 apps/
│   ├── 📁 api/                    # NestJS Backend API
│   │   ├── 📁 src/
│   │   │   ├── 📁 modules/        # Feature modules
│   │   │   │   ├── 📁 books/      # Book management
│   │   │   │   ├── 📁 health/     # Health checks
│   │   │   │   └── 📁 prisma/     # Database service
│   │   │   └── 📄 main.ts         # Application bootstrap
│   │   └── 📁 docker/             # Docker configuration
│   └── 📁 web/                    # Next.js Frontend
│       ├── 📁 src/
│       │   ├── 📁 app/            # Next.js app router
│       │   ├── 📁 components/     # React components
│       │   │   └── 📁 books/      # Book-related components
│       │   │       ├── 📄 BooksTable.tsx    # Advanced data table
│       │   │       └── 📄 Button.tsx        # Add book button
│       │   └── 📁 lib/            # Utilities and API hooks
│       │       └── 📁 api/books/  # React Query hooks
│       └── 📁 docker/             # Docker configuration
├── 📁 tools/
│   └── 📁 prisma/                 # Database schema & migrations
├── 📁 shared/
│   └── 📁 schema/                 # Shared TypeScript types
├── 📄 docker-compose.dev.yml     # Development environment
├── 📄 docker-compose.prod.yml    # Production environment
└── 📄 DOCKER_SECURITY.md         # Security documentation
```

## 🧪 Development Workflow

### **📊 Working with the Books Table**

1. **Adding Books**:

   ```bash
   # Use the "Add Sample Book" button in the UI
   # Or make API calls directly to POST /books
   ```

2. **Table Features**:

   ```bash
   # Sorting: Click any column header
   # Filtering: Type in the search box
   # Pagination: Use navigation controls
   # Page Size: Select from dropdown (5, 10, 20, 50)
   ```

3. **Real-time Updates**:
   ```bash
   # Data automatically refreshes when:
   # - New books are added
   # - Existing books are modified
   # - Network connection is restored
   ```

### **🔧 Database Operations**

```bash
# Generate Prisma client
pnpm prisma:generate

# Run database migrations
pnpm prisma:migrate

# Open Prisma Studio
pnpm prisma:studio
```

### **🧪 Testing**

```bash
# API Tests
pnpm --filter api test
pnpm --filter api test:e2e

# Web Tests (when implemented)
pnpm --filter web test

# Full test suite
pnpm test
```

## 🔐 Security Features

- **🛡️ Network Isolation**: Docker internal networking
- **🔒 Input Validation**: Comprehensive Zod schema validation
- **🚦 Rate Limiting**: Configurable request throttling
- **🛡️ Security Headers**: Helmet.js security middleware
- **🌐 CORS Protection**: Configurable cross-origin resource sharing
- **📊 Health Monitoring**: Application and database health checks

## 🐳 Docker Architecture

### **🔄 Development Mode**

- **Hot-reloading** for both frontend and backend
- **External API access** for testing and development
- **Volume mounting** for real-time code changes
- **Database persistence** across container restarts

### **🚀 Production Mode**

- **Zero Trust networking** - only web app externally accessible
- **Optimized builds** with multi-stage Docker files
- **Security hardening** with minimal attack surface
- **Health checks** for container orchestration

## 🎨 UI Screenshots & Features

### **📱 Books Management Interface**

- **Clean, modern design** with intuitive navigation
- **Responsive layout** that works on all devices
- **Real-time search** across all book fields
- **Visual stock indicators** (green/yellow/red dots)
- **Professional typography** with proper spacing

### **📊 Advanced Data Table**

- **Sortable columns** with visual sort indicators
- **Pagination controls** with page size selection
- **Loading states** with smooth animations
- **Empty states** with helpful guidance
- **Error handling** with user-friendly messages

## 🔧 Environment Configuration

### **Required Variables**

```bash
# Application
NODE_ENV=development|production|test
PORT=8080

# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8080

# Security
CORS_ORIGINS=http://localhost:3000,http://web:3000
```

## 🚀 Deployment

### **Development**

```bash
docker compose -f docker-compose.dev.yml up --build
```

### **Production**

```bash
# Set environment variables
export DATABASE_URL="your-production-db-url"
export DB_PASSWORD="your-secure-password"

# Deploy
docker compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📄 License

This project is licensed under the **UNLICENSED** License - see the source code for details.

## 🙏 Acknowledgments

- **NestJS** - Progressive Node.js framework
- **Next.js** - React framework for production
- **Prisma** - Next-generation ORM
- **React Query** - Powerful data synchronization
- **TailwindCSS** - Utility-first CSS framework
- **@tanstack/react-table** - Headless table library
- **Docker** - Containerization platform

---

**🎉 Built with ❤️ by Chen Zadik**
