import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportIncidentApiService {
  constructor(private http: HttpClient) {}

  sendDataToServer(data: any) {
    const apiUrl = 'http://localhost:5000/report-incident/user-report';
    // Sends post request to server
    console.log('service:', data);

    // Adds error handling using catchError
    return this.http.post(apiUrl, data).pipe(
      catchError(() => {
        // Creates an error using a factory function
        const error = new Error('An error occurred');
        console.error('An error occurred:', error);

        // Returns the error as an observable
        return throwError(() => error);
      })
    );
  }
}
