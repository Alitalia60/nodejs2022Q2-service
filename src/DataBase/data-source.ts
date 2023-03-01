import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { User } from '../user/entities/user.entity';
import { Track } from '../track/entities/track.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Favorites } from '../favorites/entities/favorite.entity';

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
  entities: [User, Track, Artist, Album, Favorites],
  synchronize: true,
  // synchronize: false,
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
