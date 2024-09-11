import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Application } from './application';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LauncherService {
  private apiUrl = 'https://localhost:44341/api/applications';

  constructor(private http: HttpClient) {}

  // Get all applications
  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }

  // Add a new application
  addApplication(app: Application): Observable<any> {
    return this.http.post(this.apiUrl, app).pipe(
      catchError((error) => {
        console.error('Error adding application:', error);
        return throwError(error);
      })
    );
  }

  // Delete an application by ID
  deleteApplication(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting application:', error);
        return throwError(error);
      })
    );
  }

  // Launch an application by ID
  launchApplication(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/launch/${id}`, {}).pipe(
      catchError((error) => {
        console.error('Error launching application:', error);
        return throwError(error);
      })
    );
  }
}
