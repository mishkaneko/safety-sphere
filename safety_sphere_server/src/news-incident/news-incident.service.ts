import { Injectable } from '@nestjs/common';
import { knex } from '../knex';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class NewsIncidentService {
  constructor() {}

  async saveNewsReport(newsReport) {
    const { incidentType, location, title, source, summary, website } =
      newsReport;
    console.log('HI from service');

    try {
      // Check if a record with the same title exists in the database
      // const existingRecord = await knex('news_report')
      //   .select('id')
      //   .where('title', title)
      //   .first();

      // if (!existingRecord) {
      await knex('news_report').insert({
        incident_id: incidentType,
        location: location,
        title: title,
        source: source,
        summary: summary,
        website: website,
      });
      return { message: 'News saved into db' };
      // }
      return { message: 'News already exists in db' };
    } catch (error) {
      throw Error(error);
    }
  }

  async saveNewsReports(dataArr) {
    try {
      for (const newsReport of dataArr) {
        await this.saveNewsReport(newsReport);
      }
      return { message: 'All news saved into db' };
    } catch (error) {
      throw Error(error);
    }
  }
}
