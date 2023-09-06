import { Injectable } from '@nestjs/common';
import { knex } from '../knex';
import { CreateIncidentReportDto } from './report-incident.dto';

@Injectable()
export class ReportIncidentService {
  constructor() {}

  async postIncidentReport(dto: CreateIncidentReportDto) {
    const transformedDto = this.transformDto(dto);
    try {
      await knex('user_report').insert({
        user_id: '1',
        incident_id: dto.incidentType,
        date: 'date',
        // date: dto.date,
        time: 'time',
        // time: dto.time,
        longitude: dto.coordinates.lat,
        latitude: dto.coordinates.lng,
        description: dto.incidentDetails,
      });
      return 'Incident report saved into db';
    } catch (error) {
      throw Error(error);
    }
  }

  private transformDto(dto: CreateIncidentReportDto) {
    dto.incidentType = this.transformIncidentType(dto.incidentType);
    // dto.date = this.transformDate(dto.date);
    // dto.time = this.transformTime(dto.time);
    return dto;
  }

  private transformIncidentType(incidentType: string) {
    switch (incidentType) {
      case 'physicalAssault':
        return '1';
      case 'verbalThreat':
        return '2';
      case 'sexualAssault':
        return '3';
      case 'suspiciousIndividuals':
        return '4';
      case 'theft':
        return '5';
      case 'fallingFromHeights':
        return '6';
      case 'animalEncounters':
        return '7';
      case 'otherIncidentTypes':
        return '8';
    }
  }

  // private transformDate(date: string) {
  //   let transformedDate = date.match(/(\w{3}) (\d{2}) (\d{4})/);
  //   const month = transformedDate[1];
  //   const day = transformedDate[2];
  //   const year = transformedDate[3];
  //   const parsedDate = new Date(`${year}-${month}-${day}`);

  //   // Format the date in yyyy/mm/dd format
  //   const formattedDate = parsedDate
  //     .toLocaleDateString('en-UK', {
  //       year: 'numeric',
  //       month: '2-digit',
  //       day: '2-digit',
  //     })
  //     .replace(/\//g, '-');
  //   return formattedDate;
  // }

  // private transformTime(time: string) {
  //   let formattedTime = time.match(/(\d{2}:\d{2}:\d{2})/)[0];
  //   return formattedTime;
  // }
}
