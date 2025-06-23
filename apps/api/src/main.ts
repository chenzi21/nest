import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AppModule } from '@api/modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { Configuration } from '@api/config/configuration';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const configService = app.get(ConfigService<Configuration, true>);
  const port = configService.get('port', { infer: true });
  const corsOrigins = configService.get('corsOrigins', { infer: true });
  const corsCredentials = configService.get('corsCredentials', { infer: true });

  app.use(helmet());

  app.enableCors({
    origin: corsOrigins,
    credentials: corsCredentials,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  app.enableShutdownHooks();

  const documentConfig = new DocumentBuilder()
    .setTitle('NestJS Book Management API')
    .setDescription('A robust REST API for managing book collections')
    .setVersion('1.0')
    .addTag('books')
    .build();

  patchNestjsSwagger();

  const document = SwaggerModule.createDocument(app, documentConfig, {
    deepScanRoutes: true,
    autoTagControllers: true,
  });

  SwaggerModule.setup('api', app, document);

  await app.listen(port, '0.0.0.0');
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
  Logger.log(`📚 API Documentation: http://localhost:${port}/api`);
  Logger.log(`❤️  Health Check: http://localhost:${port}/health`);

  process.on('SIGTERM', () => {
    Logger.log('SIGTERM received, shutting down gracefully');
    void app.close();
  });

  process.on('SIGINT', () => {
    Logger.log('SIGINT received, shutting down gracefully');
    void app.close();
  });
}

void bootstrap();
