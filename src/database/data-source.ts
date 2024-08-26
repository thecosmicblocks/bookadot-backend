import { DataSource } from 'typeorm';
import { join } from 'path';
import { Environment } from 'src/constants';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_POSTGRES_HOST,
  port: parseInt(process.env.DATABASE_POSTGRES_PORT || '5432', 10),
  username: process.env.DATABASE_POSTGRES_USERNAME,
  password: process.env.DATABASE_POSTGRES_PASSWORD,
  database: process.env.DATABASE_POSTGRES_NAME,
  connectTimeoutMS: 0,
  logNotifications: true,
  ssl: true,
  synchronize:
    [String(Environment.local), String(Environment.test)].indexOf(
      process.env.ENV,
    ) !== -1,
  entities: [join(__dirname, '..', 'modules/**/*.entity.{ts,js}')],
  poolErrorHandler: (err) => {
    console.log(err);
  },
  migrations: [join(__dirname, '..', 'database/migrations/*{.js,.ts}')],
});
