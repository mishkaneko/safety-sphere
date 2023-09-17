import { CreateIncidentReportDto } from 'src/report-incident/report-incident.dto';
import { ReportIncidentHistoryService } from './report-incident-history.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

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
  async getSpecificReportRecord(@Param('id') id: number) {
    const reportRecord =
      await this.reportIncidentHistoryService.getSpecificReportRecord(id);
    console.log('reportRecord: ', reportRecord);
    const convertedReportRecord = [
      { name: 'reportId', key: 'id', value: reportRecord.id },
      { name: 'incident', key: 'incidentType', value: reportRecord.incident },
      { name: 'date', key: 'datePicker', value: reportRecord.date },
      { name: 'time', key: 'timePicker', value: reportRecord.time },
      { name: 'location', key: 'location', value: reportRecord.location },
      {
        name: 'description',
        key: 'description',
        value: reportRecord.description,
      },
      { name: 'imageArr', key: 'image', value: reportRecord.image_array },
    ];
    console.log('typeof date: ', typeof reportRecord.date);

    return convertedReportRecord;
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
