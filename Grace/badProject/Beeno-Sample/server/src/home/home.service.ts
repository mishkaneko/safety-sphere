import { Injectable } from '@nestjs/common';
import { IncidentListItem } from 'src/incident-list-item/incident-list-item.interface';
import { knex } from 'src/knex';

@Injectable()
export class HomeService {
  constructor() {}

  async getUserReports(): Promise<IncidentListItem[]> {
    try {
      let data = await knex.select('*').from('users_report');
      return data;
    } catch (error) {
      throw Error('Failed to get data from db');
    }
  }
}
