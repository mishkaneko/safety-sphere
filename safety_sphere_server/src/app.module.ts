import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportIncidentModule } from './report-incident/report-incident.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { ReportIncidentHistoryModule } from './report-incident-history/report-incident-history.module';
import { IncidentMapModule } from './incident-map/incident-map.module';
import { NewsIncidentService } from './news-incident/news-incident.service';

@Module({
  imports: [ReportIncidentModule, UserProfileModule, ReportIncidentHistoryModule, IncidentMapModule],
  controllers: [AppController],
  providers: [AppService, NewsIncidentService],
})
export class AppModule {}
