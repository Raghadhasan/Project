import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SectionService } from 'src/app/services/section.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/trainer/services/course.service';
import { UserService } from 'src/app/trainer/services/user.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  @ViewChild('callcreateDailog') createDailog !: TemplateRef<any>;
  @ViewChild('callupdateDailog') updateDailog !: TemplateRef<any>;
  @ViewChild('callDeleteDailog') deleteDailog !: TemplateRef<any>;
  @ViewChild('TraineesDialog') TraineesDialog !: TemplateRef<any>;

  _filterText: string = '';
  courses: any[] = [];
  trainers: any[] = [];
  selectedCourse: any = {};
  sectionForm: FormGroup;
  selectedImage: File | null = null;
  selectedFile: File | null = null;
  dialogRef: MatDialogRef<any> | null = null;
  coursesid : any;
  tsid : any;
  Trainerid : any;

  constructor(
    public sectionService: SectionService,
    public employeeService: EmployeeService,

    public course: CourseService,
    public dialog: MatDialog,
    public user: UserService
  ) {
    this.sectionForm = new FormGroup({
      courseid: new FormControl(0, Validators.required),
      userid: new FormControl(0, Validators.required),
      sectionlink: new FormControl(''),
      sectionstarttime: new FormControl(''),
      sectionendtime: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.sectionService.getAllTrainerSections();
    this.course.getAllCourses().subscribe(res => {
      this.courses = res;
    });
    this.employeeService.getAllUsersTrainer().subscribe(res => {
      this.trainers = res;
    });
  }
  openAddTraineesDialog(tsid: number, courseid: number,Trainerid:number): void {
    debugger
    this.coursesid = courseid;
    this.tsid = tsid;
    this.Trainerid = Trainerid;

    this.dialog.open(this.TraineesDialog, {
      width: '400px',
    });
  }



  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(tsid: any, courseid: any,Trainerid: any): void {
    if (this.selectedFile) {

    //   console.log('Uploading file:', this.selectedFile.name);
    //   console.log('TSID:', tsid);
    //   console.log('CourseID:', courseid);
    const file = this.selectedFile;
    if (file) {
  
      this.sectionService.uploadTraineeFile(file, Trainerid ,tsid, courseid).subscribe({
        next: () => {
console.log("ok")        },
        error: (err) => {
        }
      });
    }
    }
  }

  openDeleteDailog(id: any) {
    console.log(id);
    debugger
    const dialogRef = this.dialog.open(this.deleteDailog).afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes') {
          console.log("Deleting section with ID:", id);
          this.sectionService.deleteSection(id).subscribe({
            next: (response) => this.sectionService.getAllTrainerSections(),
            error: (err) => console.error("Delete error:", err),
          });
        }

        else if (result == 'No') {
          console.log('thank you')

        }
      }
    })
  }

  openCreateDailog() {
    const dialogRef = this.dialog.open(this.createDailog).afterClosed().subscribe((result) => {

    });
  }

  updateCourse: FormGroup = new FormGroup({
    userid: new FormControl(0, Validators.required),
    sectionlink: new FormControl(''),
    courseid: new FormControl(''),
    tsid: new FormControl(''),
    sectionstarttime: new FormControl(''),
    sectionendtime: new FormControl(''),
  });

  pData: any = {};
  openUpdateDailog(obj: any) {
    debugger;
    this.pData = obj;

    // Format date to yyyy-MM-dd
    const formatDate = (dateString: string) => {
      return new Date(dateString).toISOString().split('T')[0];
    };

    this.updateCourse.patchValue({
      tsid: obj.tsid,

      courseid: obj.courseid,
      userid: obj.userid,
      sectionlink: obj.sectionlink,
      sectionstarttime: formatDate(obj.sectionstarttime),
      sectionendtime: formatDate(obj.sectionendtime),
    });

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
  openLink(link: string): void {
    if (link) {
      window.open(link, '_blank');
    } else {
      console.error('Invalid link');
    }
  }




  ExecUpdate(): void {
    debugger
    if (this.updateCourse.valid) {
      const formData = this.updateCourse.value;
      this.sectionService.updateSection(formData).subscribe(
        (response) => {
          this.sectionService.getAllTrainerSections();
        },
        (error) => {
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  loadTemplate() {
    this.sectionService.downloadTemplate().subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'Trainees.xlsx';
        anchor.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading the template:', error);
      }
    );
  }
}
