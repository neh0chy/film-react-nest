import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { FilmsRepositoryMongo } from 'src/repository/films-mongodb.repository';
import { FilmsRepositoryPostgres } from 'src/repository/films-postgres.repository';
import { AppConfig } from 'src/app.config.provider';

@Injectable()
export class OrderService {
  constructor(
    @Inject('CONFIG') private readonly config: AppConfig,
    private readonly filmsRepositoryMongo: FilmsRepositoryMongo,
    private readonly filmsRepositoryPostgres: FilmsRepositoryPostgres,
  ) {}

  async makeOrder(order: OrderDto) {
    const { tickets } = order;

    for (const ticket of tickets) {
      const { film, session, row, seat } = ticket;
      let document;
      const place = `${row}:${seat}`;

      if (this.config.database.driver === 'postgres') {
        document = await this.filmsRepositoryPostgres.findFilmById(film);
      } else if (this.config.database.driver === 'mongodb') {
        document = await this.filmsRepositoryMongo.findFilmById(film);
      }

      const schedule = document.schedule.find((s) => s.id === session);
      if (!schedule) throw new BadRequestException('Сеанс не найден');

      const isTaken = Array.isArray(schedule.taken)
        ? schedule.taken.includes(place)
        : schedule.taken?.split(',').includes(place);

      if (isTaken) throw new BadRequestException('Это место уже занято');

      if (Array.isArray(schedule.taken)) {
        schedule.taken.push(place);
      } else {
        schedule.taken = `${schedule.taken}, ${place}`;
      }

      if (this.config.database.driver === 'postgres') {
        await this.filmsRepositoryPostgres.save(document);
      } else if (this.config.database.driver === 'mongodb') {
        await document.save();
      }
    }

    return {
      total: tickets.length,
      items: order.tickets.map((tiket) => ({ ...tiket })),
    };
  }
}
