import * as mongoose from 'mongoose';
import { AppConfig } from '../app.config.provider';
import { DataSource } from 'typeorm';
import { FilmEntity } from 'src/films/entities/film.entity';
import { ScheduleEntity } from 'src/films/entities/schedule.entity';

export const databaseProvider = {
  provide: 'DATA_SOURCE',
  useFactory: async (
    config: AppConfig,
  ): Promise<typeof mongoose | DataSource> => {
    if (config.database.driver == 'mongodb') {
      const dataSource = await mongoose.connect(config.database.url);
      // console.log('Database connected successfully');
      return dataSource;
    } else if (config.database.driver == 'postgres') {
      const dataSource = new DataSource({
        type: config.database.driver,
        host: config.database.host,
        port: Number(config.database.port),
        username: config.database.username,
        password: config.database.password,
        database: config.database.databasename,
        entities: [FilmEntity, ScheduleEntity],
        synchronize: false,
      });
      await dataSource.initialize();
      // console.log('Database connected successfully');
      return dataSource;
    }
  },
  inject: ['CONFIG'],
};
