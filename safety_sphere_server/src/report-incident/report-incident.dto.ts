import { date, number, object, string } from 'cast.ts';
import {
  IsString,
  IsObject,
  IsArray,
  IsDateString,
  IsNumber,
  IsNumberString,
} from 'class-validator';

export class CreateIncidentReportDto {
  @IsString()
  incidentType: string;

  @IsDateString()
  date: string;

  @IsDateString()
  time: string;

  @IsString()
  location: string;

  // @IsObject()
  // coordinates: { lat: number; lng: number };

  @IsNumberString()
  lat: number;

  @IsNumberString()
  lng: number;

  @IsString()
  description: string;

  // @IsArray()
  // image: string[];
  filenames: string[];
}

// export let createIncidentReportParser = object({
//   incidentType: string(),

//   date: date(),

//   time: date(),

//   location: string(),

//   coordinates: object({ lat: number(), lng: number() }),

//   description: string(),

//   // image: string
// });
