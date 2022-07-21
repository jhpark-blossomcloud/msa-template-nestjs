import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'k8s.uoslife.com',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_DATABASE || 'nestjs-template',
  username: process.env.DB_USERNAME || 'uoslife',
  password: process.env.DB_PASSWORD || 'secret',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/**/*.js'],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  migrationsRun: true,
};

export const dataSource = new DataSource(dataSourceConfig);
