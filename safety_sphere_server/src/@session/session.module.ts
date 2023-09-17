import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { SessionService } from './session.service'

@Module({
  providers: [SessionService]
})
export class SessionModule implements NestModule {
  constructor(private sessionService: SessionService) {}

  configure(consumer: MiddlewareConsumer) {   
    consumer
    // .apply(cookieParser('your-secret-key'))
    .apply(cookieParser(this.sessionService.secretKey))
    .forRoutes('*');
    
    consumer
      .apply(session({
        // secret: 'your-secret-key',
        secret: this.sessionService.secretKey,
        resave: false,
        saveUninitialized: true,
        cookie: {
          maxAge: 3600000, // 1小时
          secure: true,
          httpOnly: true
        }
      }))
      .forRoutes('*');
  }
}
