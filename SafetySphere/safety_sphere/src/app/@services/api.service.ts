import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  post(data: any, path: string) {
    const apiUrl = `http://localhost:5000${path}`;
    // Sends post request to server
    console.log('service:', data);
    return this.http.post(apiUrl, data);
  }

  get(path: string) {
    const apiUrl = `http://localhost:5000${path}`;
    return this.http.get(apiUrl);
  }

  put(data: any, path: string) {
    const apiUrl = `http://localhost:5000${path}`;
    // Sends put request to server
    console.log('service:', data);
    return this.http.put(apiUrl, data);
  }
}
