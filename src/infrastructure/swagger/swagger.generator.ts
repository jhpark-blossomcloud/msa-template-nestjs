import { NestApplication } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { tags } from '@infrastructure/swagger/swagger.tags';

const document = new DocumentBuilder()
  .setTitle('시대생 API')
  .setDescription('시대생 API 문서')
  .setContact('시대생 개발팀', 'https://uoslife.team', 'dev@uoslife.team')
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
  .addServer(process.env.APP_URL || 'http://localhost:3000')
  .addServer('https://api.uoslife.team')
  .setVersion('0.0.1');

tags.forEach((tag) => document.addTag(tag.name, tag.description));

export default function generateSwaggerDocument(
  app: NestApplication | NestFastifyApplication,
) {
  return SwaggerModule.createDocument(app, document.build());
}
