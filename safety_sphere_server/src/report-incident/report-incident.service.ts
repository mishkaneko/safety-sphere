import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateIncidentReportDto } from './report-incident.dto';
import { knex } from '../knex';

@Injectable()
export class ReportIncidentService {
  constructor() {}

  async postIncidentReport(dto: CreateIncidentReportDto) {
    const transformedDto = this.transformData(dto);
    console.log('transformedDto: ', transformedDto);

    let user_id: any = await knex('user')
      .select('id')
      .from('user')
      .where('user_uuid', dto.user_uuid);

    console.log(user_id);

    const [userReportId] = await knex('user_report')
      .insert({
        user_id: user_id[0].id,
        incident_id: dto.incidentType,
        date: dto.date,
        time: dto.time,
        location: dto.location,
        latitude: dto.lat,
        longitude: dto.lng,
        description: dto.description,
      })
      .returning('id');
    console.log(userReportId);

    console.log('store images:', dto.filenames);
    if (dto.filenames.length > 0) {
      for (const image of dto.filenames) {
        await knex('image').insert({
          user_report_id: userReportId.id,
          // TODO rename to filename
          image_string: image,
        });
      }
    }

    return { message: 'successfully inserted user_report into db' };
  }

  transformData(dto: CreateIncidentReportDto) {
    dto.incidentType = this.transformIncidentType(dto.incidentType);
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
      default:
        throw new BadRequestException('invalid incident type: ' + incidentType);
    }
  }
}
