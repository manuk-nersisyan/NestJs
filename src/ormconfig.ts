import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'mediumclone',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/**/migrations//*{.ts,.js}'],
  synchronize: true,
  migrationsRun: true,
};

export default config;
