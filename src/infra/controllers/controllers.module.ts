import { Module } from '@nestjs/common';
import { CreateNotificationController } from './create-notification.controller';
import { HealthCheckController } from './health-check';
import { ListNotificationsController } from './list-notifications.controller';

@Module({
  controllers: [
    HealthCheckController,
    ListNotificationsController,
    CreateNotificationController,
  ],
})
export class ControllersModule {}
