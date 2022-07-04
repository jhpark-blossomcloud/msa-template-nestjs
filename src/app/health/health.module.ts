import { Module } from '@nestjs/common';

import { HealthController } from '@app/health/health.controller';
import { HealthService } from '@app/health/health.service';

@Module({
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
