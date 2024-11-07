import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Course {
    coursename: string;
    coursestartdate?: Date;
    courseenddate?: Date;
    courseimage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  
  private baseUrl = 'https://localhost:7276/api/Course/GetAllCourse'; // API URL

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl); // Correct API call
  }
}
