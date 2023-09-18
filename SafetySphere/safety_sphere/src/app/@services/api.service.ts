import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  get(path: string) {
    const apiUrl = `${this.apiOrigin}${path}`;
    return this.http.get(apiUrl);
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
