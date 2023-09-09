import { Injectable } from '@nestjs/common';
import { knex } from '../knex';

@Injectable()
export class ReportIncidentHistoryService {
  constructor() {}

  async getReportRecord() {
    try {
      const reportRecord = await knex
        .select(
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
}
