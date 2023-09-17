import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';
import { IncidentListItem } from '../incident-list-item/incident-list-item.interface';

@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Get('/user-reports')
  getUserReports(): Promise<IncidentListItem[]> {
    return this.homeService.getUserReports();
  }
}
