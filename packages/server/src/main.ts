import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // class transformerとclass validatorを有効にする

  const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Food Order System API')
    .setDescription('API documentation for the Food Order System')
    .setVersion('1.0')
    .addTag('admin')
    .addTag('order')
    .addTag('kitchen')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
