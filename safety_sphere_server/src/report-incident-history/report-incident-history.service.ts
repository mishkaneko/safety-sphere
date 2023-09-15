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
          'user_report.id',
          'incident_type.incident',
          'user_report.date',
          'user_report.time',
          'user_report.location',
          'user_report.description',
          knex.raw('ARRAY_AGG(image.image_string) AS image_array'),
        )
        .from('user_report')
        .leftJoin('image', 'user_report.id', 'image.user_report_id')
        .where('user_report.user_id', '1')
        .leftJoin(
          'incident_type',
          'user_report.incident_id',
          'incident_type.id',
        )
        .groupBy(
          'user_report.id',
          'user_report.incident_id',
          'user_report.date',
          'user_report.time',
          'user_report.location',
          'user_report.description',
          'incident_type.incident',
        )
        .orderBy('user_report.date', 'desc')
        .orderBy('user_report.time', 'desc');
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
          'user_report.id',
          'incident_type.incident',
          'user_report.date',
          'user_report.time',
          'user_report.location',
          'user_report.description',
          knex.raw('ARRAY_AGG(image.image_string) AS image_array'),
        )
        .from('user_report')
        .leftJoin('image', 'user_report.id', 'image.user_report_id')
        .where('user_report.user_id', '1')
        .leftJoin(
          'incident_type',
          'user_report.incident_id',
          'incident_type.id',
        )
        .where('user_report.id', id)
        .groupBy(
          'user_report.id',
          'user_report.incident_id',
          'user_report.date',
          'user_report.time',
          'user_report.location',
          'user_report.description',
          'incident_type.incident',
        )
        .first();
      console.log('server service:', reportRecord);
      return reportRecord;
    } catch (error) {
      throw Error(error);
    }
  }

  async updateSpecificReportRecord(dto: CreateIncidentReportDto, id: number) {
    const transformedDto = this.transformDto(dto);
    try {
      await knex('user_report')
        .update({
          // change user_id
          user_id: '1',
          incident_id: dto.incidentType,
          date: dto.date,
          time: dto.time,
          location: dto.location,
          latitude: dto.coordinates.lat,
          longitude: dto.coordinates.lng,
          description: dto.description,
        })
        .where('id', id);

      await knex('image').delete().where('user_report_id', id);

      for (const image of dto.image) {
        await knex('image').insert({
          user_report_id: id,
          image_string: image,
        });
      }

      return { message: 'successfully updated report record' };
    } catch (error) {
      throw Error(error);
    }
  }
  transformDto(dto: CreateIncidentReportDto) {
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
    }
  }

  async getReportRecordThroughPost() {
    try {
      const reportRecord = await knex
        .select(
          'user_report.id',
          'incident_type.incident',
          'user_report.date',
          'user_report.time',
          'user_report.location',
          'user_report.description',
          knex.raw('ARRAY_AGG(image.image_string) AS image_array'),
        )
        .from('user_report')
        .leftJoin('image', 'user_report.id', 'image.user_report_id')
        .where('user_report.user_id', '1')
        .leftJoin(
          'incident_type',
          'user_report.incident_id',
          'incident_type.id',
        )
        .groupBy(
          'user_report.id',
          'user_report.incident_id',
          'user_report.date',
          'user_report.time',
          'user_report.location',
          'user_report.description',
          'incident_type.incident',
        )
        .orderBy('user_report.date', 'desc')
        .orderBy('user_report.time', 'desc');
      console.log('server service:', reportRecord);
      return reportRecord;
    } catch (error) {
      throw Error(error);
    }
  }
}
