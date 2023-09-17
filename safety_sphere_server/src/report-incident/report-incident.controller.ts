import { CreateIncidentReportDto } from './report-incident.dto';
import { ReportIncidentService } from './report-incident.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('report-incident')
export class ReportIncidentController {
  constructor(private reportIncidentService: ReportIncidentService) {}

  @Post('user-report')
  postIncidentReport(@Body() createIncidentReportDto: CreateIncidentReportDto) {
    console.log('user-report')
    return this.reportIncidentService.postIncidentReport(
      createIncidentReportDto,
    );
  }
}
