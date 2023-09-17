import { Module } from '@nestjs/common';
import { ReportIncidentHistoryController } from './report-incident-history.controller';
import { ReportIncidentHistoryService } from './report-incident-history.service';

@Module({
  controllers: [ReportIncidentHistoryController],
  providers: [ReportIncidentHistoryService]
})
export class ReportIncidentHistoryModule {}
