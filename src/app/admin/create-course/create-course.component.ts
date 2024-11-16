import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/services/home.service';


@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent {

  constructor(private home: HomeService) { }
  fileToUpload: any;
  createCourse: FormGroup = new FormGroup({
    coursename: new FormControl('', Validators.required),
    coursestartdate: new FormControl(null),
    courseenddate: new FormControl(null),
    courseimage: new FormControl('', Validators.required),
  });

  save() {
    debugger;
    if (this.fileToUpload) {
      this.createCourse.value.courseimage = this.home.display_Image;
    }
    this.home.creatCourse(this.createCourse.value)
  }
  uploadImage(file: any) {
    if (file.length == 0)
      return;
    this.fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    this.home.uploadAttachment(formData);
  }
}
