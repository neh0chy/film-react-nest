import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { FilmsRepository } from 'src/repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async makeOrder(order: OrderDto) {
    const { tickets } = order;

    for (const ticket of tickets) {
      const { film, session, row, seat } = ticket;

      const document = await this.filmsRepository.findFilm(film);

      if (!document) {
        throw new BadRequestException('Фильм не найден!');
      }

      const currentSession = document.schedule.find(
        (item) => item.id === session,
      );
      if (!currentSession) {
        throw new BadRequestException('Сеанс не найден!');
      }

      const seatIdentifier = `${row}:${seat}`;
      if (currentSession.taken.includes(seatIdentifier)) {
        throw new BadRequestException('Это место уже занято!');
      }

      currentSession.taken.push(seatIdentifier);
      await document.updateOne({
        $set: {
          schedule: document.schedule,
        },
      });
    }

    return { items: order.tickets.map((tiket) => ({ ...tiket })) };
  }
}
