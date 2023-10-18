import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { InfraModule } from './infra.module';
import { InnerLogger } from './providers/logger/logger';

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    InfraModule,
    new FastifyAdapter({
      logger: true,
    }),
  );

  const logger = await app.resolve(InnerLogger);

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

  await app.listen(3000, '0.0.0.0');

  logger.debug(`Server running 🚀: ${await app.getUrl()}/api`);
})();
