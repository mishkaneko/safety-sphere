import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportIncidentModule } from './report-incident/report-incident.module';

@Module({
  imports: [ReportIncidentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
