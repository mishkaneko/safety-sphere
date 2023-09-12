import { CreateIncidentReportDto } from 'src/report-incident/report-incident.dto';
import { ReportIncidentHistoryService } from './report-incident-history.service';
import { Body, Controller, Get, Param, Put } from '@nestjs/common';

@Controller('report-incident-history')
export class ReportIncidentHistoryController {
  constructor(
    private reportIncidentHistoryService: ReportIncidentHistoryService,
  ) {}
  @Get('report-record')
  getReportRecord() {
    return this.reportIncidentHistoryService.getReportRecord();
  }
  @Get('edit-incident/:id')
  getSpecificReportRecord(@Param('id') id: number) {
    return this.reportIncidentHistoryService.getSpecificReportRecord(id);
  }
  @Put('edit-incident/:id')
  updateSpecificReportRecord(
    @Body() createIncidentReportDto: CreateIncidentReportDto,
    @Param('id') id: number,
  ) {
    return this.reportIncidentHistoryService.updateSpecificReportRecord(
      createIncidentReportDto,
      id,
    );
  }
}
