import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Course {
  coursename: string;
  coursestartdate?: Date;
  courseenddate?: Date;
  courseimage?: string;
}
export interface UserCourses {
  courseid: number;
  coursename: string;
  coursestartdate?: Date;
  courseenddate?: Date;
  courseimage?: string;
  tsid: number;
  alltraineefile?: string;
  sectionlink?: string;
  sectionendtime?: Date;
  sectionstarttime?: Date;
}
export interface UserCoursesResponse {
  status: boolean;
  courses: UserCourses[];
}
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'https://localhost:7276/api/Course/GetAllCourse'; // API URL

  constructor(private http: HttpClient) { }

  // getAllCourses(): Observable<Course[]> {
  //   return this.http.get<Course[]>(this.baseUrl); // Correct API call
  // }
  // getAllUserCourses(): Observable<UserCoursesResponse[]> {
  //   return;  
  // }
  getAllUserCourses(): Observable<any> {
    let User_Id = localStorage.getItem('User_Id')

    return this.http.get<any>(`https://localhost:7276/api/Course/GetCourseByUserId/${User_Id}`)
  }
  uploadCourseMaterial(TSID: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`https://localhost:7276/api/Course/UploadCourseMaterial/${TSID}`, formData);
  }
}
