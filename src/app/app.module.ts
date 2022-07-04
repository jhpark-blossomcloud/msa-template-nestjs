import { Module } from '@nestjs/common';

import { HealthModule } from '@app/health/health.module';

@Module({
  imports: [HealthModule],
})
export class AppModule {}
