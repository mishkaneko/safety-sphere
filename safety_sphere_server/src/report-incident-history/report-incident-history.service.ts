import { Injectable } from '@nestjs/common';
import { knex } from '../knex';
import { CreateIncidentReportDto } from 'src/report-incident/report-incident.dto';

@Injectable()
export class ReportIncidentHistoryService {
  constructor() {}

  async getReportRecord() {
    try {
      const reportRecord = await knex
        .select(
          'id',
          'incident_id',
          'date',
          'time',
          'location',
          'description',
          'images',
        )
        .from('user_report')
        // Change user_id accordingly
        .where('user_id', '1')
        .orderBy('date', 'desc');
      console.log('server service:', reportRecord);
      return reportRecord;
    } catch (error) {
      throw Error(error);
    }
  }

  async getSpecificReportRecord(id) {
    try {
      const reportRecord = await knex
        .select(
          'id',
          'incident_id',
          'date',
          'time',
          'location',
          'description',
          'images',
        )
        .from('user_report')
        .where('id', id)
        .orderBy('date', 'desc');
      console.log('server service:', reportRecord);
      return reportRecord;
    } catch (error) {
      throw Error(error);
    }
  }

  async updateSpecificReportRecord(dto: CreateIncidentReportDto, id: number) {
    const transformedDto = this.transformDto(dto);
    try {
      const reportRecord = await knex('user_report')
        .update({
          user_id: '1',
          incident_id: dto.incidentType,
          date: dto.date,
          time: dto.time,
          location: dto.location,
          latitude: dto.coordinates.lat,
          longitude: dto.coordinates.lng,
          description: dto.incidentDetails,
          images: dto.images,
        })
        .where('id', id);
      console.log('server service:', reportRecord);
      return reportRecord;
    } catch (error) {
      throw Error(error);
    }
  }
  transformDto(dto: CreateIncidentReportDto) {
    dto.incidentType = this.transformIncidentType(dto.incidentType);
    dto.date = this.transformDate(dto.date);
    dto.time = this.transformTime(dto.time);
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
  private transformDate(date: string) {
    // let transformedDate = date.match(/(\w{3}) (\d{2}) (\d{4})/);
    let transformedDate = date.match(/^(\d{4}-\d{2}-\d{2})/);
    // const month = transformedDate[1];
    // const day = transformedDate[2];
    // const year = transformedDate[3];
    // const parsedDate = new Date(`${year}-${month}-${day}`);

    // Format the date in yyyy/mm/dd format
    // const formattedDate = parsedDate
    //   .toLocaleDateString('en-UK', {
    //     year: 'numeric',
    //     month: '2-digit',
    //     day: '2-digit',
    //   })
    //   .replace(/\//g, '-');
    // return formattedDate;
    return transformedDate[0];
  }

  private transformTime(time: string) {
    let formattedTime = time.match(/(\d{2}:\d{2})/)[0];
    return formattedTime;
  }
}
