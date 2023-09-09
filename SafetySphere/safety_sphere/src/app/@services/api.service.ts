import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  sendDataToServer(data: any, path: string) {
    const apiUrl = `http://localhost:5000${path}`;
    // Sends post request to server
    console.log('service:', data);
    return this.http.post(apiUrl, data);
  }

  getDataFromServer(path: string) {
    const apiUrl = `http://localhost:5000${path}`;
    console.log('service for getting: ', this.http.get(apiUrl));

    return this.http.get(apiUrl);
  }
}
