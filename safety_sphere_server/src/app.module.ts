import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportIncidentModule } from './report-incident/report-incident.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { ReportIncidentHistoryModule } from './report-incident-history/report-incident-history.module';

@Module({
  imports: [ReportIncidentModule, UserProfileModule, ReportIncidentHistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
