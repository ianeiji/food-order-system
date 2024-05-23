import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // class transformerとclass validatorを有効にする
  app.enableCors({ origin: ['http://localhost:3000'] });
  app.use(helmet());

  await app.listen(3002);
}
bootstrap();
