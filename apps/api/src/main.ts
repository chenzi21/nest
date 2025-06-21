import { NestFactory } from '@nestjs/core';
import { AppModule } from '@api/modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
    autoTagControllers: true,
  });

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 8080);
}

void bootstrap();
