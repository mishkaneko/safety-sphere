import { Module } from '@nestjs/common';
import { IncidentMapController } from './incident-map.controller';
import { IncidentMapService } from './incident-map.service';

@Module({
  controllers: [IncidentMapController],
  providers: [IncidentMapService]
})
export class IncidentMapModule {}
