import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public http: HttpClient) { }
  Abouts: any = [];
  Courses: any = [];


  GetAllAbout() {
    this.http.get('https://localhost:7276/api/About/GetAllAbout').subscribe(result => {
      this.Abouts = result;
    }, err => {
      console.log(err.message);
    });
  }

  // Get All Courses
  getAllCourses() {
    this.http.get('https://localhost:7276/api/Course/GetAllCourses').subscribe(result => {
      this.Courses = result;
    }, err => {
      console.log(err.message);
    });
  }

  // Delete Course

  deleteCourse(id: number) {
    // Create HttpParams object and set the 'id' query parameter
    const params = new HttpParams().set('id', id.toString());

    // Pass the params object in the request
    this.http.delete('https://localhost:7276/api/Course/DeleteCourse', { params }).subscribe(resp => {
      console.log('The course has been deleted');
      window.location.reload();
    }, err => {
      console.log('Error');
    });
  }

  creatCourse(body: any) {
    debugger;
    this.http.post('https://localhost:7276/api/Course/CreateCourse', body).subscribe(response => {
      console.log('created')
      window.location.reload();
    },
      err => {
        console.log('errer');
      })
  }
  updateCourse(body: any) {
    this.http.put('https://localhost:7276/api/Course/UpdateCourse', body).subscribe(result => {
      this.Courses = result;
      window.location.reload();
    }, err => {
      console.log(err.message);
    });
  }
}