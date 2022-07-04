import { Module } from '@nestjs/common';

import { HealthModule } from '@app/health/health.module';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [HealthModule, UserModule],
})
export class AppModule {}
