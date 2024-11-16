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
    debugger
    this.http.get('https://localhost:7276/api/Course/GetAllCourse').subscribe(result => {
      this.Courses = result;
    }, err => {
      console.log(err.message);
    });
  }

  // Delete Course

  deleteCourse(id: number) {
    this.http.delete('https://localhost:7276/api/Course/DeleteCourse/' + id).subscribe(resp => {
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

  display_Image: any;
  uploadAttachment(file: FormData) {
    debugger;
    this.http.post('https://localhost:7276/api/Course/uploadImageCourse', file).subscribe((resp: any) => {
      //object course table 
      this.display_Image = resp.courseimage;
    }, err => {
      console.log('Error');

    })
  }

}