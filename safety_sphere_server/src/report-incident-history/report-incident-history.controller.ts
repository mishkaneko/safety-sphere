import { ReportIncidentHistoryService } from './report-incident-history.service';
import { Controller, Get } from '@nestjs/common';

@Controller('report-incident-history')
export class ReportIncidentHistoryController {
  constructor(
    private reportIncidentHistoryService: ReportIncidentHistoryService,
  ) {}
  @Get('report-record')
  getReportRecord() {
    return this.reportIncidentHistoryService.getReportRecord();
  }
}
