import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiOrigin = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  upload(data: FormData, path: string) {
    const apiUrl = `${this.apiOrigin}${path}`;
    return this.http.post(apiUrl, data);
  }

  post(data: any, path: string) {
    const apiUrl = `${this.apiOrigin}${path}`;
    // Sends post request to server
    console.log('service:', data);
    return this.http.post(apiUrl, data);
  }

  get(path: string, user_uuid?: any) {
    const apiUrl = `${this.apiOrigin}${path}`;

    // Create an instance of HttpParams
    let params = new HttpParams();

    // Check if user_uuid is provided and add it as a query parameter
    if (user_uuid) {
      params = params.set('user_uuid', user_uuid);
    }

    return this.http.get(apiUrl, { params });
  }

  put(data: any, path: string) {
    const apiUrl = `${this.apiOrigin}${path}`;
    // Sends put request to server
    console.log('service:', data);
    return this.http.put(apiUrl, data);
  }

  toReportImageUrl(filename: string) {
    return this.apiOrigin + '/uploads/user-report-image/' + filename;
  }
}
