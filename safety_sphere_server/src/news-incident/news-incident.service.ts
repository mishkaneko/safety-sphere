import { Injectable } from '@nestjs/common';
import { GeocodingService } from './geocoding/geocoding.service';
import { knex } from '../knex';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class NewsIncidentService {
  constructor(private geocodingService: GeocodingService) {}

  async saveNewsReports(dataArr) {
    console.log('dataArr at news service: ', dataArr);
    try {
      const promises = dataArr.flatMap((newsCategory) =>
        newsCategory.map((newsReport) => this.saveNewsReport(newsReport)),
      );

      await Promise.all(promises);

      return { message: 'All news saved into db' };
    } catch (error) {
      console.error('Geocoding request failed:', error.message);
      throw Error(error);
    }
  }

  async saveNewsReport(newsReport) {
    const { incidentType, locations, title, source, summary, website } =
      newsReport;
    let locationLat, locationLng;

    // Get coordinates of news location
    try {
      const geocodingResult =
        await this.geocodingService.geocodeAddress(locations);
      const { lat, lng } = geocodingResult.results[0]?.geometry?.location || {};
      locationLat = lat;
      locationLng = lng;
    } catch (geocodingError) {
      console.error('Geocoding error:', geocodingError.message);
      throw new Error('Geocoding failed');
    }

    console.log('newsReport: ', newsReport);

    try {
      // Check if a record with the same title exists in the database
      const existingRecord = await knex('news_report')
        .select('id')
        .where('title', title)
        .first();

      // Insert news into db
      if (!existingRecord) {
        await knex('news_report').insert({
          incident_id: incidentType,
          location: locations,
          latitude: locationLat,
          longitude: locationLng,
          title: title,
          source: source,
          summary: summary,
          website: website,
        });
        console.log('News saved into db');
        return { message: 'News saved into db' };
      }
      console.log('News already exists in db');
      return { message: 'News already exists in db' };
    } catch (error) {
      console.error('Error saving news report:', error.message);
      throw Error(error);
    }
  }
}
