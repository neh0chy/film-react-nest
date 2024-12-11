import { AppConfig } from '../app.config.provider';
import { FilmEntity } from './entities/film.entity';
import { FilmSchema } from './schemas/films.schema';

export const filmsProvider = {
  provide: 'FILM_REPOSITORY',
  inject: ['DATA_SOURCE', 'CONFIG'],
  useFactory: (dataSource, config: AppConfig) => {
    if (config.database.driver === 'postgres') {
      return dataSource.getRepository(FilmEntity);
    } else if (config.database.driver === 'mongodb') {
      return dataSource.model('Film', FilmSchema);
    }
  },
};
