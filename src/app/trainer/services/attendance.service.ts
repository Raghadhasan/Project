import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Trainee } from '../models/trainee.model'; 

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://your-api-url/api'; 

  constructor(private http: HttpClient) {}

  submitAttendance(trainees: any[]): Observable<any> { 
    return this.http.post(`${this.apiUrl}/SubmitAttendance`, trainees)
  }
}
