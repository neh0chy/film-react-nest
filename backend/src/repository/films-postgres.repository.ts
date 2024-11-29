import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FilmEntity } from 'src/films/entities/film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsRepositoryPostgres {
  constructor(
    @Inject('FILM_REPOSITORY') private filmsRepository: Repository<FilmEntity>,
  ) {}

  async findAll(): Promise<{ total: number; items: FilmEntity[] }> {
    try {
      const [total, items] = await Promise.all([
        this.filmsRepository.count(),
        this.filmsRepository.find({ relations: { schedule: true } }),
      ]);

      return { total, items };
    } catch (error) {
      throw new NotFoundException('Нет доступных фильмов для показа!');
    }
  }

  async findFilmById(filmId: string) {
    try {
      return await this.filmsRepository.findOne({
        where: { id: filmId },
        relations: { schedule: true },
      });
    } catch (error) {
      throw new NotFoundException('Фильм не найден!');
    }
  }

  async findSchedule(id: string) {
    const filmSchedule = await this.findFilmById(id);
    return {
      total: filmSchedule.schedule.length,
      items: filmSchedule.schedule,
    };
  }

  async save(film: FilmEntity) {
    await this.filmsRepository.save(film);
  }
}
