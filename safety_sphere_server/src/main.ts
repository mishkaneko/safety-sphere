import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { print } from 'listening-on';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enables CORS support for app, making it accessible to web clients hosted on different domains or ports
  app.enableCors();

  // Global Pipe
  app.useGlobalPipes(new ValidationPipe());

  // Swagger
  setupSwagger(app);

  let port = 4000;
  await app.listen(port);
  print(port);
}

function setupSwagger(app: INestApplication) {
  const builder = new DocumentBuilder();
  const config = builder
    .setTitle('SafetySphere')
    .setDescription('This is a basic Swagger document.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
