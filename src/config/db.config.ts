import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { registerAs } from '@nestjs/config';
import * as path from 'path';

export default registerAs(
  'dbconfig.dev',
  (): PostgresConnectionOptions => ({
    // Don't put this here, Instead put in the env file
    url: process.env.url,
    type: 'postgres',
    port: +process.env.port,
    entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],

    synchronize: true,
  }),
);
