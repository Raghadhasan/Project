import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface IReport {
  tsid: number;
  courseName: string;
  traineemark: number | null;
  successfuL_STUDENTS: number;
  unsuccessfuL_STUDENTS: number;
  avG_SUCCESSFUL_MARKS: number;
  avG_UNSUCCESSFUL_MARKS: number;

}
@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private apiUrl = 'https://localhost:7276/api/Report/GetCourseDetails'; 

  constructor(private http: HttpClient) {}

  getCourseDetails(): Observable<IReport[]> {
    return this.http.get<IReport[]>(this.apiUrl);
  }
}
