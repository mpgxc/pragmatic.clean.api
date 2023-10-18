import { Module } from '@nestjs/common';
import { CreateNotificationController } from './create-notification.controller';
import { ListNotificationsController } from './list-notifications.controller';

@Module({
  controllers: [ListNotificationsController, CreateNotificationController],
})
export class ControllersModule {}
