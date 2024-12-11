import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        findAll: jest
          .fn()
          .mockResolvedValue([{ id: 'Test id1' }, { id: 'Test id2' }]),
        findSchedule: jest.fn().mockResolvedValue({ id: 'Test id3' }),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('.getFilms() should call .findAll() from service', async () => {
    const films = await controller.getFilms();
    expect(films).toEqual([{ id: 'Test id1' }, { id: 'Test id2' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('.getShedule() should call .findSchedule() from service', async () => {
    const id = 'Test id3';
    const film = await controller.getShedule(id);
    expect(film).toEqual({ id: 'Test id3' });
    expect(service.findSchedule).toHaveBeenCalledWith(id);
  });
});
