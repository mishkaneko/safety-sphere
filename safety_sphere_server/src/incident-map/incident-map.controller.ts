import { IncidentMapService } from './incident-map.service';
import { Controller, Get } from '@nestjs/common';

@Controller('incident-map')
export class IncidentMapController {
  constructor(private incidentMapService: IncidentMapService) {}
  @Get('user-report')
  getUserReport() {
    return this.incidentMapService.getUserReport();
  }
}
