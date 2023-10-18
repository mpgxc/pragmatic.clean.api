import { Controller, Get } from '@nestjs/common';
import { Notification, notificationFactory } from 'entities/notification';
import { InnerLogger } from 'infra/providers/logger/logger';
import { InjectorLoggerService } from 'infra/providers/logger/logger.injector';

@Controller('notifications')
export class ListNotificationsController {
  constructor(
    @InjectorLoggerService(ListNotificationsController.name)
    private readonly logger: InnerLogger,
  ) {}

  @Get('/')
  async handle(): Promise<Notification[]> {
    const notification = notificationFactory({
      title: 'Notification title',
      description: 'Notification description',
    });

    this.logger.log('Notifications listed', { notifications: [notification] });

    return [notification];
  }
}
