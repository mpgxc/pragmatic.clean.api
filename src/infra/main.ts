import { LoggerService } from '@mpgxc/logger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { proxy } from 'aws-serverless-fastify';
import { type FastifyInstance } from 'fastify';
import { InfraModule } from './infra.module';

let cache: FastifyInstance;

const server = async (): Promise<FastifyInstance> => {
  const instance = new FastifyAdapter();

  const app = await NestFactory.create<NestFastifyApplication>(
    InfraModule,
    instance,
  );

  const logger = await app.resolve(LoggerService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      validateCustomDecorators: true,
    }),
  );

  app.useLogger(logger);
  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Pragmatic Clean API')
      .setDescription(
        'Construindo uma API Rest com NestJS utilizando conceitos de `Arquitetura Simples` de forma pragmática.',
      )
      .setVersion('1.0')
      .addTag('pragmatic.clean.api')
      .build(),
  );

  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api');

  app.enableCors();

  await app.init();

  return instance.getInstance();
};

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> =>
  proxy(cache ?? (await server()), event, context);
