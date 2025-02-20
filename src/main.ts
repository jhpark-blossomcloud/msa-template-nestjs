import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';

import { API_PREFIX } from './constants';
import { MainModule } from './main.module';

import generateSwaggerDocument from '@infrastructure/swagger/swagger.generator';

(async () => {
  // Initialize app with root module
  const app = await NestFactory.create<NestFastifyApplication>(
    MainModule,
    new FastifyAdapter(),
  );

  // Create swagger document
  SwaggerModule.setup(`${API_PREFIX}/docs`, app, generateSwaggerDocument(app), {
    swaggerOptions: { persistAuthorization: true },
  });

  // Apply rules for validation
  app
    .useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    .useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

  // Apply CORS
  app.enableCors({ origin: true, credentials: true });

  // Apply global api prefix
  app.setGlobalPrefix(API_PREFIX);

  // Listen to requests
  await app.listen(process.env.APP_PORT || 3000, '0.0.0.0');
})();
