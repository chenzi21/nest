/// <reference types="node" />

import { patchNestjsSwagger } from '@anatine/zod-nestjs';

// Patch NestJS Swagger for Zod integration in tests
patchNestjsSwagger();

// Test environment variables for Zod validation
(process.env as Record<string, string>).NODE_ENV = 'test';
process.env.PORT = '8080';
process.env.DATABASE_URL =
  'postgresql://postgres:postgres@localhost:5432/nest_test?schema=public';
process.env.CORS_ORIGINS = 'http://localhost:3000';
process.env.CORS_CREDENTIALS = 'true';
