import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeComponent } from 'src/app/home/home.component';
import { HomeService } from 'src/app/services/home.service';
import { CreateCourseComponent } from '../create-course/create-course.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { ReportsService } from 'src/app/services/report.service';
import * as saveAs from 'file-saver';
import { CerficationService, TraineecertificateDto } from 'src/app/services/certificate.service';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css'],
  // imports: [SidebarComponent]
})
export class ManageCourseComponent implements OnInit {
  @ViewChild('callDeleteDailog') deleteDailog!: TemplateRef<any>;
  @ViewChild('callupdateDailog') updateDailog!: TemplateRef<any>;
  @ViewChild('IssueCertificatesDialog') issueCertificatesDialog!: TemplateRef<any>;
  @ViewChild('inquiryDialog') inquiryDialog!: TemplateRef<any>;

  courseid: number | undefined;
  sortBy: string = 'courseid';
  sortOrder: 'asc' | 'desc' = 'asc';
  searchTerm: string = '';
  selectedcourseid: number | undefined;
  certificates: TraineecertificateDto[] = [];


  constructor(public home: HomeService, private reportsService: ReportsService, private cerficationService: CerficationService, public dialog: MatDialog) { }

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
        if (result == 'yes') this.home.deleteCourse(id);
        else if (result == 'No') console.log('thank you');
      }
    });
  }

  openCreateDailog() {
    this.dialog.open(CreateCourseComponent);
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
    this.updateCourse.controls['courseid'].setValue(this.pData.courseid);
    this.dialog.open(this.updateDailog);
  }

  formatDate(datetime: string): string {
    debugger;
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    let dateOnly = `${year}-${month}-${day}`;
    return dateOnly;
  }

  save() {
    this.home.updateCourse(this.updateCourse.value);
  }

  uploadImage(file: any) {
    debugger;
    if (file.length == 0) return;
    let fileToUpload = <File>file[0];
    const formData = new FormData();
  }

  // Added method for Inquiry Dialog
  openInquiryDailog(courseId: number) {
    this.selectedcourseid = courseId;
    const dialogRef = this.dialog.open(this.inquiryDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((action: string) => {
      if (action === 'issueCertificates') {
        console.log(`Issuing certificates for Course ID: ${courseId}`);
        // Add logic for issuing certificates
      } else if (action === 'extractStudents') {
        console.log(`Extracting successful students for Course ID: ${courseId}`);
        // Add logic for extracting successful students
      }
    });
  }
  ExportPassedTrainees(courseId: number): void {
    this.reportsService.exportPassedTrainees(courseId).subscribe({
      next: (blob) => {
        saveAs(blob, `PassedTrainees Course_${courseId}.xlsx`);
      },
      error: (error) => {
        console.error('Error exporting passed trainees:', error);
      }
    });
  }
  issueCertificates(courseId: number) {
    this.cerficationService.getCertification(courseId).subscribe(
      (data: TraineecertificateDto[]) => {
        debugger

        this.certificates = data;
        this.dialog.open(this.issueCertificatesDialog, {
          width: '600px',
        });
      },
      (error) => {
        console.error('Error fetching certification data', error);
      }
    );
  }
  issueCertificate(courseId: number, traineeId: number): void {
    this.cerficationService.issueCertificate(courseId, traineeId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Certificate_${traineeId}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading the certificate:', error);
      }
    });
  }
}


