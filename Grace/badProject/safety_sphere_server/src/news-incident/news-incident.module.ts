import { NewsIncidentService } from './news-incident.service';
import { Module } from '@nestjs/common';
import { GeocodingService } from './geocoding/geocoding.service';
import { ScraperProvider } from './scraper.provider';
import { NewsIncidentController } from './news-incident.controller';

@Module({
  providers: [NewsIncidentService, GeocodingService, ScraperProvider],
  controllers: [NewsIncidentController],
})
export class NewsIncidentModule {}
