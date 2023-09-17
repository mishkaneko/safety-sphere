import { IncidentMapService } from './incident-map.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('incident-map')
export class IncidentMapController {
  constructor(private incidentMapService: IncidentMapService) {}
  @Get('user-report')
  async getUserReport() {
    let userReportArr = await this.incidentMapService.getUserReport();
    console.log(userReportArr);

    // Convert date and time
    for (let userReport of userReportArr) {
      userReport.date = formatDate(userReport.date);
      userReport.time = formatTime(userReport.time);
    }
    function formatDate(dateStr) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    function formatTime(timeStr) {
      const date = new Date(timeStr);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    return userReportArr;
  }
  @Get('news-report')
  getNewsReport() {
    return this.incidentMapService.getNewsReport();
  }

  @Get('filtered-report')
  getFilteredReport(@Query() filters: any) {
    const filteredDate = this.incidentMapService.filterReport(filters);
    return filteredDate;
  }
}
