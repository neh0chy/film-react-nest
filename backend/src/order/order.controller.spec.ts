import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

const mockData = {
  email: 'test@test.com',
  phone: '+78001234567',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '2519ca34-32b4-4a7f-971d-3bb585c6450b',
      daytime: '2024-06-30T12:00:53+03:00',
      day: '30 июня',
      time: '12:00',
      row: 1,
      seat: 1,
      price: 350,
    },
  ],
};

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        makeOrder: jest.fn().mockResolvedValue(mockData),
      })
      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('.makeOrder() should call .makeOrder() from service', async () => {
    const order = mockData;
    const orderDone = await controller.makeOrder(order);

    expect(orderDone).toEqual(order);
    expect(service.makeOrder).toHaveBeenCalledWith(order);
  });
});
