import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeocodingService {
  private apiKey = 'AIzaSyDh1joiYE20D0hLHM0NADy2fUBViB_KMcw';

  async geocodeAddress(address: string) {
    console.log('hi from geocoding service');

    try {
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address,
      )}&key=${this.apiKey}`;
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      throw new Error('Geocoding request failed');
    }
  }
}
