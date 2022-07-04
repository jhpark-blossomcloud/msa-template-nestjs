import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { AppModule } from '@app/app.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'k8s.uoslife.com'),
        port: configService.get<number>('DB_PORT', 5432),
        database: configService.get<string>('DB_DATABASE', 'nestjs-template'),
        username: configService.get<string>('DB_USERNAME', 'uoslife'),
        password: configService.get<string>('DB_PASSWORD', 'secret'),
        entities: ['dist/**/*.entity.js'],
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
    AppModule,
    InfrastructureModule,
  ],
})
export class MainModule {}
