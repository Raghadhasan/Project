import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeComponent } from 'src/app/home/home.component';
import { HomeService } from 'src/app/services/home.service';
import { CreateCourseComponent } from '../create-course/create-course.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SidebarComponent } from "../sidebar/sidebar.component";


@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css'],
  // imports: [SidebarComponent]
})
export class ManageCourseComponent implements OnInit {
  @ViewChild('callDeleteDailog') deleteDailog !: TemplateRef<any>;
  @ViewChild('callupdateDailog') updateDailog !: TemplateRef<any>;
  courseid: number | undefined;
  constructor(public home: HomeService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.home.getAllCourses();
  }


  openDeleteDailog(id: any) {
    console.log(id);
    const dialogRef = this.dialog.open(this.deleteDailog).afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes')
          this.home.deleteCourse(id);

        else if (result == 'No')
          console.log('thank you')
      }
    })
  }
  openCreateDailog() {
    this.dialog.open(CreateCourseComponent)
  }

  updateCourse: FormGroup = new FormGroup({
    COURSENAME: new FormControl('', Validators.required),
    COURSEMEETINGLINK: new FormControl(''),
    COURSESTARTTIME: new FormControl(''),
    COURSEENDTIME: new FormControl(''),
    CATEGORYNAME: new FormControl(''),
    CATEGORYID: new FormControl(''),
    courseid: new FormControl('')
  });

  pData: any = {};
  openUpdateDailog(obj: any) {

    this.pData = obj;
    console.log(this.pData);
    this.updateCourse.controls['courseid'].setValue(this.pData.COURSEID)
    this.dialog.open(this.updateDailog);
  }


  save() {

    this.home.updateCourse(this.updateCourse.value)
  }
}






