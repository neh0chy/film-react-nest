import { Inject, Injectable } from '@nestjs/common';
import { AppConfig } from 'src/app.config.provider';
import { FilmsRepositoryMongo } from '../repository/films-mongodb.repository';
import { FilmsRepositoryPostgres } from '../repository/films-postgres.repository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('CONFIG') private readonly config: AppConfig,
    private readonly filmsRepositoryMongo: FilmsRepositoryMongo,
    private readonly filmsRepositoryPostgres: FilmsRepositoryPostgres,
  ) {}

  async findAll() {
    if (this.config.database.driver === 'postgres') {
      return await this.filmsRepositoryPostgres.findAll();
    } else if (this.config.database.driver === 'mongodb') {
      return await this.filmsRepositoryMongo.findAll();
    }
  }

  async findSchedule(id: string) {
    if (this.config.database.driver === 'postgres') {
      return await this.filmsRepositoryPostgres.findSchedule(id);
    } else if (this.config.database.driver === 'mongodb') {
      return await this.filmsRepositoryMongo.findSchedule(id);
    }
  }
}
