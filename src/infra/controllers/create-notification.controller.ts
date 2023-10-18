import { Controller, Post } from '@nestjs/common';
import { notificationFactory } from 'entities/notification';
import { InnerLogger } from 'infra/providers/logger/logger';

@Controller('notifications')
export class CreateNotificationController {
  constructor(readonly logger: InnerLogger) {}

  @Post()
  async handle(): Promise<void> {
    const notification = notificationFactory({
      title: 'Notification title',
      description: 'Notification description',
    });

    this.logger.log('Notification created', { notification });
  }
}
