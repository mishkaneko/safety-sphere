import { IncidentMapService } from './incident-map.service';
import { Controller, Get } from '@nestjs/common';

@Controller('incident-map')
export class IncidentMapController {
  constructor(private incidentMapService: IncidentMapService) {}
  @Get('user-report')
  async getUserReport() {
    let userReport = await this.incidentMapService.getUserReport();
    console.log('userReport: ', userReport);

    return;
  }
  @Get('news-report')
  getNewsReport() {
    return this.incidentMapService.getNewsReport();
  }
}
