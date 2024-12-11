import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { TskvLogger } from './logger/tskv.logger';
import { JsonLogger } from './logger/json.logger';
import { DevLogger } from './logger/dev.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  const loggerType = process.env.LOGGER_TYPE || 'dev';
  switch (loggerType) {
    case 'json':
      app.useLogger(new JsonLogger());
      break;
    case 'tskv':
      app.useLogger(new TskvLogger());
      break;
    default:
      app.useLogger(new DevLogger());
  }

  app.useLogger(new TskvLogger());
  await app.listen(3000);
}
bootstrap();
