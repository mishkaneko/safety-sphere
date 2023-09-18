import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { print } from 'listening-on';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as http from 'http'
import * as cors from 'cors'
import * as socketIO from 'socket.io'
import { ExpressAdapter } from '@nestjs/platform-express';
import * as ioRegister from './io'

async function bootstrapServer() {
  const app = express()
  app.use(cors())

  const server = new http.Server(app)
  const io = new socketIO.Server(server, {cors: {}})
  ioRegister.setServer(io)

  await bootstrapApp(new ExpressAdapter(app))

  let port = 4000;
  server.listen(port,()=>{
    print(port);
  });
}

async function bootstrapApp(expressAdapter: ExpressAdapter) {
  const app = await NestFactory.create(AppModule, expressAdapter);

  await app.init() // NOTE need to add this line

  // Enables CORS support for app, making it accessible to web clients hosted on different domains or ports
  // app.enableCors();

  // Global Pipe
  app.useGlobalPipes(new ValidationPipe());

  // Swagger
  setupSwagger(app);

  // let port = 4000;
  // await app.listen(port)
  // print(port);
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

bootstrapServer();
