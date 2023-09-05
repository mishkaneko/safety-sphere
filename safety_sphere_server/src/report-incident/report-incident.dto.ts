import { IsString, IsObject } from 'class-validator';

export class CreateIncidentReportDto {
  @IsString()
  incidentType: string;

  @IsString()
  date: string;

  @IsString()
  time: string;

  @IsObject()
  coordinates: { lat: number; lng: number };

  @IsString()
  incidentDetails: string;
}
