import { IsString, IsObject, IsArray } from 'class-validator';

export class CreateIncidentReportDto {
  @IsString()
  incidentType: string;

  @IsString()
  date: string;

  @IsString()
  time: string;

  @IsString()
  location: string;

  @IsObject()
  coordinates: { lat: number; lng: number };

  @IsString()
  incidentDetails: string;

  @IsArray()
  images: string;
}
