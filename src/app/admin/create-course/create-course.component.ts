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

  createCourse: FormGroup = new FormGroup({
    COURSENAME: new FormControl('', Validators.required),
    COURSEMEETINGLINK: new FormControl(''),
    COURSESTARTTIME: new FormControl(''),
    COURSEENDTIME: new FormControl(''),
    CATEGORYID: new FormControl('')
  });

  save() {
    this.home.creatCourse(this.createCourse.value)
  }
}
