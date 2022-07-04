import { Module } from '@nestjs/common';

import { AuthModule } from '@app/auth/auth.module';
import { HealthModule } from '@app/health/health.module';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [HealthModule, UserModule, AuthModule],
})
export class AppModule {}
