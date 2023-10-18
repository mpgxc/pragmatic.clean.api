import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Notification, notificationFactory } from 'entities/notification';
import { InnerLogger } from 'infra/providers/logger/logger';
import { InjectorLoggerService } from 'infra/providers/logger/logger.injector';

@ApiTags('notifications')
@Controller('notifications')
export class ListNotificationsController {
  constructor(
    @InjectorLoggerService(ListNotificationsController.name)
    private readonly logger: InnerLogger,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The notifications has been successfully listed.',
  })
  async handle(): Promise<Notification[]> {
    const notification = notificationFactory({
      title: 'Notification title',
      description: 'Notification description',
    });

    this.logger.log('Notifications listed', { notifications: [notification] });

    return [notification];
  }
}
