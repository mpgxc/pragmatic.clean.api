import { LoggerModule } from '@mpgxc/logger';
import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/controllers.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      isGlobal: true,
    }),
    ControllersModule,
  ],
  controllers: [],
  providers: [],
})
export class InfraModule {}
