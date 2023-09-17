import { IsString, IsObject, IsArray, IsDateString } from 'class-validator';

export class CreateIncidentReportDto {
  @IsString()
  incidentType: string;

  @IsDateString()
  date: string;

  @IsDateString()
  time: string;

  @IsString()
  location: string;

  @IsObject()
  coordinates: { lat: number; lng: number };

  @IsString()
  description: string;

  @IsArray()
  image: string;
}
