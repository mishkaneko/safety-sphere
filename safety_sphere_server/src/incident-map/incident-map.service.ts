import { Injectable } from '@nestjs/common';
import { knex } from '../knex';

@Injectable()
export class IncidentMapService {
  constructor() {}

  async getUserReport() {
    try {
      const userReport = await knex
        .select(
          'incident_type.incident',
          'user_report.date',
          'user_report.time',
          'user_report.location',
          'user_report.latitude',
          'user_report.longitude',
          'user_report.description',
          'user_report.images',
        )
        .from('user_report')
        .join('incident_type', 'incident_type.id', 'user_report.incident_id');
      return userReport;
    } catch (error) {
      throw Error(error);
    }
  }

  async getNewsReport() {
    try {
      const newsReport = await knex
        .select(
          'incident_type.incident',
          'news_report.location',
          'news_report.latitude',
          'news_report.longitude',
          'news_report.title',
          'news_report.source',
          'news_report.summary',
          'news_report.website',
        )
        .from('news_report')
        .join('incident_type', 'incident_type.id', 'news_report.incident_id')
        .where('news_report.latitude', '>', 0);
      return newsReport;
    } catch (error) {
      throw Error(error);
    }
  }
}
