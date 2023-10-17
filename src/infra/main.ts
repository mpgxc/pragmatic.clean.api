import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { InfraModule } from './infra.module';

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    InfraModule,
    new FastifyAdapter({
      logger: true,
    }),
  );

  await app.listen(3000, '0.0.0.0');
})();
