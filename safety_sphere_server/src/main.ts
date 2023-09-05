import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { print } from 'listening-on';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enables CORS support for app, making it accessible to web clients hosted on different domains or ports
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  let port = 5000;
  await app.listen(port);
  print(port);
}

bootstrap();
