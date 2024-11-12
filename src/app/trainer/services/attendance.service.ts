import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Trainee } from '../models/trainee.model'; 
export interface UserAttendanceDTO {
  userId: number;
  userName: string;
  seat: number;
  status: string | null;
}
@Injectable({
  providedIn: 'root'
})


export class AttendanceService {
  private apiUrl = 'https://localhost:7276/api/Attendance/';

  constructor(private http: HttpClient) { }
  
  submitAttendance(UserAttendance: UserAttendanceDTO[]): Observable<any> {
    return this.http.put(`${this.apiUrl}UpdateSectionAttendanceStatus`, UserAttendance);
  }
  getSectionAttendanceStatus(tsid: number): Observable<UserAttendanceDTO[]> {
    return this.http.get<UserAttendanceDTO[]>(`${this.apiUrl}GetSectionAttendanceStatus/${tsid}`);
  }
}
