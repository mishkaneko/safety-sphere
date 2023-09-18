import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportIncidentModule } from './report-incident/report-incident.module';
import { ReportIncidentHistoryModule } from './report-incident-history/report-incident-history.module';
import { IncidentMapModule } from './incident-map/incident-map.module';
import { NewsIncidentModule } from './news-incident/news-incident.module';
import { LoginModule } from './login/login.module';
import { FollowModule } from './follow/follow.module';
import { EscapeRouteGateway } from './escape-route/escape-route.gateway';
import { UserPositionService } from './user-position/user-position.service';

@Module({
  imports: [
    ReportIncidentModule,
    ReportIncidentHistoryModule,
    IncidentMapModule,
    NewsIncidentModule,
    LoginModule,
    FollowModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserPositionService,
    //  EscapeRouteGateway
  ],
})
export class AppModule {}
