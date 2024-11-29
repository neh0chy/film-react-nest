import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { GetFilmDto, GetScheduleDto } from 'src/films/dto/films.dto';
import { Film, FilmDocument } from 'src/films/schemas/films.schema';

@Injectable()
export class FilmsRepositoryMongo {
  constructor(
    @Inject('FILM_REPOSITORY') private filmModel: Model<FilmDocument>,
  ) {}

  getFilmMapperFn(film: Film): GetFilmDto {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
      schedule: this.getScheduleMapperFn(film.schedule),
    };
  }

  private getScheduleMapperFn(schedules): GetScheduleDto[] {
    return schedules.map((schedule) => ({
      id: schedule.id,
      daytime: schedule.daytime,
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken,
    }));
  }

  async findAll(): Promise<{ total: number; items: GetFilmDto[] }> {
    const total = await this.filmModel.countDocuments({});
    const films = await this.filmModel.find({});

    if (!films) {
      throw new NotFoundException('Нет доступных фильмов для показа!');
    }

    return {
      total,
      items: films.map((film) => this.getFilmMapperFn(film)),
    };
  }

  async findFilmById(id: string) {
    const film = await this.filmModel.findOne({ id });
    if (!film) {
      throw new NotFoundException('Фильм не найден!');
    }
    return film;
  }

  async findSchedule(
    id: string,
  ): Promise<{ total: number; items: GetScheduleDto[] | null }> {
    const film = await this.filmModel.findOne({ id });

    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}
