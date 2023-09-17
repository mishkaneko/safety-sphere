import { Injectable } from '@nestjs/common';
import { CreateIncidentReportDto } from './report-incident.dto';
import { knex } from '../knex';

@Injectable()
export class ReportIncidentService {
  // dateNumber;
  // timeNumber;
  constructor() {}

  async postIncidentReport(dto: CreateIncidentReportDto) {
    const transformedDto = this.transformData(dto);

    try {
      const [userReportId] = await knex('user_report')
        .insert({
          user_id: '1',
          incident_id: dto.incidentType,
          date: dto.date,
          time: dto.time,
          location: dto.location,
          latitude: dto.coordinates.lat,
          longitude: dto.coordinates.lng,
          description: dto.description,
        })
        .returning('id');
      console.log(userReportId);

      for (const image of dto.image) {
        await knex('image').insert({
          user_report_id: userReportId.id,
          image_string: image,
        });
      }

      return { message: 'successfully inserted user_report into db' };
    } catch (error) {
      throw Error(error);
    }
  }

  transformData(dto: CreateIncidentReportDto) {
    dto.incidentType = this.transformIncidentType(dto.incidentType);
    // this.dateNumber = this.transformDateAndTime(dto.date);
    // this.timeNumber = this.transformDateAndTime(dto.time);
    // console.log('this.dateNumber: ', this.dateNumber);
    // console.log('typeof this.dateNumber: ', typeof this.dateNumber);

    return dto;
  }

  private transformIncidentType(incidentType: string) {
    switch (incidentType) {
      case '肢體襲擊':
        return '1';
      case '言語威脅':
        return '2';
      case '非禮/性侵犯':
        return '3';
      case '可疑人物':
        return '4';
      case '盜竊':
        return '5';
      case '高空墮物':
        return '6';
      case '野生動物襲擊':
        return '7';
      case '其他':
        return '8';
    }
  }

  // private transformDateAndTime(data) {
  //   return Date.parse(data);
  // }
}
