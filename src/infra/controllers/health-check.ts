import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthCheckController {
  @Get('/check')
  async getHealthCheck(): Promise<{
    status: string;
  }> {
    return {
      status: 'ok',
    };
  }
}
