// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { catchError, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class ApiService {
//   constructor(private http: HttpClient) {}

//   sendDataToServer(data: any, path: string) {
//     const apiUrl = `http://localhost:5500${path}`;

//     console.log(apiUrl);
//     console.log(data);

//     // Sends post request to server
//     // Adds error handling using catchError
//     return this.http.post(apiUrl, data).pipe(
//       catchError(() => {
//         // Creates an error using a factory function
//         const error = new Error('An error occurred');
//         console.error('An error occurred:', error);

//         // Returns the error as an observable
//         return throwError(() => error);
//       })
//     );
//   }
// }
