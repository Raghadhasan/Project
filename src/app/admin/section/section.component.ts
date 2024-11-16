import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SectionService } from 'src/app/services/section.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/trainer/services/course.service';
import { UserService } from 'src/app/trainer/services/user.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  @ViewChild('callcreateDailog') createDailog !: TemplateRef<any>;
  @ViewChild('callupdateDailog') updateDailog !: TemplateRef<any>;
  @ViewChild('callDeleteDailog') deleteDailog !: TemplateRef<any>;

  _filterText: string = '';
  courses: any[] = [];
  trainers: any[] = [];
  selectedCourse: any = {};
  sectionForm: FormGroup;
  selectedImage: File | null = null;

  constructor(
    public sectionService: SectionService,
    public course: CourseService,
    public dialog: MatDialog,
    public user: UserService
  ) {
    this.sectionForm = new FormGroup({
      courseid: new FormControl(0, Validators.required),
      userid: new FormControl(0, Validators.required),
      sectionstarttime: new FormControl(''),
      sectionendtime: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.sectionService.getAllTrainerSections();
    this.course.getAllCourses().subscribe(res => {
      this.courses = res;
    });
    this.user.getAllUsers().subscribe(res => {
      this.trainers = res;
    });
  }


  openDeleteDailog(id: any) {
    console.log(id);
    const dialogRef = this.dialog.open(this.deleteDailog).afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes')
          this.sectionService.deleteSection(id);

        else if (result == 'No')
          console.log('thank you')
      }
    })
  }

  openCreateDailog() {
    const dialogRef = this.dialog.open(this.createDailog).afterClosed().subscribe((result) => {

    });
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
    debugger
    this.sectionForm.value.courseid = Number(this.sectionForm.value.courseid);
    this.sectionForm.value.userid = Number(this.sectionForm.value.userid);

    this.sectionService.createSection(this.sectionForm.value);
    this.sectionForm.reset();
  }

  uploadImage(file: any) {
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
