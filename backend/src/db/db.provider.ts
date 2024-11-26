import * as mongoose from 'mongoose';
import { AppConfig } from '../app.config.provider';
import { DataSource } from 'typeorm';
import { Film } from 'src/films/entities/film.entity';
import { Schedule } from 'src/films/entities/schedule.entity';

export const databaseProvider = {
  provide: 'DB_CONNECT',
  useFactory: async (
    config: AppConfig,
  ): Promise<typeof mongoose | DataSource> => {
    if (config.database.driver == 'mongodb') {
      return await mongoose.connect(config.database.url);
    } else if (config.database.driver == 'postgres') {
      const dataSource = new DataSource({
        type: config.database.driver,
        host: config.database.host,
        port: Number(config.database.port),
        username: config.database.username,
        password: config.database.password,
        database: config.database.databasename,
        entities: [Film, Schedule],
        synchronize: false,
      });

      return await dataSource.initialize();
    }
  },
  inject: ['CONFIG'],
};
