import { Module } from '@nestjs/common';
import { ReportIncidentController } from './report-incident.controller';
import { ReportIncidentService } from './report-incident.service';

@Module({
  imports: [],
  controllers: [ReportIncidentController],
  providers: [ReportIncidentService],
  exports: [],
})
export class ReportIncidentModule {}
