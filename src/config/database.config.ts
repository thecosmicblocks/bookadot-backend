import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './config.type';
import { Environment } from 'src/constants';

export default registerAs<DatabaseConfig>('database', () => ({
  type: 'postgres',
  host: process.env.DATABASE_POSTGRES_HOST,
  port: parseInt(process.env.DATABASE_POSTGRES_PORT, 10) || 5432,
  username: process.env.DATABASE_POSTGRES_USERNAME,
  name: process.env.DATABASE_POSTGRES_NAME,
  password: process.env.DATABASE_POSTGRES_PASSWORD,
  ssl: true,
  synchronize:
    [String(Environment.local), String(Environment.test)].indexOf(
      process.env.ENV,
    ) !== -1,
}));
