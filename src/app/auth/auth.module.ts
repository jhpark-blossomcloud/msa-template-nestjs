import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from '@app/auth/strategies/jwt.strategy';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET_KEY', '');
        return {
          secret,
          verifyOptions: { ignoreNotBefore: false, ignoreExpiration: false },
        };
      },
    }),
    UserModule,
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
