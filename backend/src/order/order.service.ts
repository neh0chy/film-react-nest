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

      // поиск фильма в базе, для которого будут добавлены занятые места
      const document = await this.filmsRepository.findFilm(film);

      if (!document) {
        throw new BadRequestException('Фильм не найден!');
      }

      // поиск сеанса для найденного фильма
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

      // пуш ряда и места в существующий массив сенса
      currentSession.taken.push(seatIdentifier);

      // обновление расписания для сеанса фильма на текущей итерации (const ticket of tickets)
      await document.save();
    }

    return {
      total: tickets.length,
      items: order.tickets.map((tiket) => ({ ...tiket })),
    };
  }
}
