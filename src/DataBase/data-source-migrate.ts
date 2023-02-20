import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const dataSourseConfig: DataSourceOptions = {
  type: 'postgres',
  // host: 'pg_database', // for Docker
  // host: 'localhost', //for local
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'root',
  database: process.env.POSTGRES_DB || 'alita_db',
  // entities: [User, Track, Artist, Album, Favorites],
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/DataBase/migrations/*.js'],
  synchronize: false,
  logging: 'all',
  logger: 'file',
};

const dataSource = new DataSource(dataSourseConfig);

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default dataSource;
