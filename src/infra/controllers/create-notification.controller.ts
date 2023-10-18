import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { notificationFactory } from 'entities/notification';
import { InnerLogger } from 'infra/providers/logger/logger';

@ApiTags('notifications')
@Controller('notifications')
export class CreateNotificationController {
  constructor(readonly logger: InnerLogger) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The notification has been successfully created.',
  })
  async handle(): Promise<void> {
    const notification = notificationFactory({
      title: 'Notification title',
      description: 'Notification description',
    });

    this.logger.log('Notification created', { notification });
  }
}
