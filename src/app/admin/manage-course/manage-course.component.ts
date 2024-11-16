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
  sortBy: string = 'courseid'; 
  sortOrder: 'asc' | 'desc' = 'asc'; 
  searchTerm: string = '';

  constructor(public home: HomeService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.home.getAllCourses();
  }

  onSortChange(sortBy: string): void {
    if (this.sortBy === sortBy) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = sortBy;
      this.sortOrder = 'asc';
    }
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
    coursename: new FormControl('', Validators.required),
    coursestartdate: new FormControl(''),
    courseenddate: new FormControl(''),
    courseimage: new FormControl(null, Validators.required),
    courseid: new FormControl('')
  });

  pData: any = {};
  openUpdateDailog(obj: any) {
    debugger;
    this.pData = obj;
    console.log(this.pData);
    this.pData.coursestartdate = this.formatDate(this.pData.coursestartdate);
    this.pData.courseenddate = this.formatDate(this.pData.courseenddate);
    this.updateCourse.controls['courseid'].setValue(this.pData.courseid)
    this.dialog.open(this.updateDailog);
  }
  formatDate(datetime: string): string {
    debugger;
    // Use JavaScript's Date object to format the date
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    let dateOnly = `${year}-${month}-${day}`;
    return dateOnly;
  }

  save() {

    this.home.updateCourse(this.updateCourse.value)
  }
  uploadImage(file: any) {
    debugger;
    if (file.length == 0)
      return;
    let fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    //this.home.uploadAttachment(formData);
    /*
    display_Image :any ; 
uploadAttachment(file:FormData){
this.http.post('https://localhost:5000/api/Course/uploadImage',file).subscribe((resp:any)=>{
  //object course table 

  this.display_Image=resp.imagename;
},err=>{
  console.log('Error');
  
})
}
    */

  }
}






