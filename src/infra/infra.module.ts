import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/controllers.module';
import { LoggerModule } from './providers/logger/logger.module';

@Module({
  imports: [LoggerModule.forRoot(), ControllersModule],
  controllers: [],
  providers: [],
})
export class InfraModule {}
