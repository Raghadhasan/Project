import { Component, Input, SimpleChanges } from '@angular/core';
import { CourseService, UserCourses } from '../services/course.service';
import { HttpClient } from '@angular/common/http';
import { AssignmentService } from '../services/assignment.service';
import { saveAs } from 'file-saver';
import { ExamsectionService } from '../services/examsection.service';
import { AttendanceService, UserAttendanceDTO } from '../services/attendance.service';

@Component({
  selector: 'app-contentmaterial',
  templateUrl: './contentmaterial.component.html',
  styleUrls: ['./contentmaterial.component.css']
})
export class ContentmaterialComponent {
  @Input() course: UserCourses | null = null;
  selectedFile: File | null = null;
  selectedFiles: File[] = [];
  uploadSuccess: string = '';
  uploadError: string = '';
  isModalOpen: boolean = false;
  trainerCourseId: number | null = null;
  assignmentMark: number | null = null;
  assignmentDuration: string | null = null;
  selectedFilePaths: string[] = [];


  isModalExamOpen: boolean = false;
  Examlink: number | null = null;
  Exammark: number | null = null;
  Examstarttime: string | null = null;
  Examendtime: string | null = null;


  isModalAttendanceOpen: boolean = false;
  sectionAttendance: UserAttendanceDTO[] = [];


  constructor(
    private courseService: CourseService,
    private assignmentService: AssignmentService,
    private examService: ExamsectionService,
    private attendanceService: AttendanceService,

  ) { }



  ngOnChanges(changes: SimpleChanges) {
    if (changes['course'] && this.course) {
      this.trainerCourseId = this.course.tsid;
    }
  }
  onExamUpload(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
    } else {
      alert('Please upload a valid PDF file');
    }
  }



  onCourseMaterialUpload(event: any) {
    debugger
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.uploadSuccess = '';
      this.uploadError = '';
    } else {
      alert('Please upload a valid PDF file');
    }
  }

  SaveCourseMaterial() {
    debugger
    if (!this.selectedFile) {
      this.uploadError = 'Please attach a file before saving.';
      return;
    }

    // Call the upload API
    this.uploadFile(this.selectedFile);
  }

  uploadFile(file: File) {
    debugger
    const formData = new FormData();
    formData.append('file', file, file.name);

    const TSID = this.course?.tsid || 0; // Assuming TSID is available in the course object

    this.courseService.uploadCourseMaterial(TSID, formData).subscribe(
      (response) => {
        this.uploadSuccess = 'File uploaded successfully!';
        this.uploadError = '';
        this.course!.alltraineefile = response.fileUrl;
      },
      (error) => {
        this.uploadError = 'Failed to upload the file. Please try again later.';
        this.uploadSuccess = '';
      }
    );
  }
  openAssignmentModal() {
    this.isModalOpen = true;
  }
  onExamUploadModal() {
    this.isModalExamOpen = true;
  }
  closeAssignmentModal() {
    this.isModalOpen = false;
    this.selectedFiles = [];
    this.assignmentMark = null;
    this.assignmentDuration = null;
  }
  closeModalExamModal() {
    this.isModalExamOpen = false;
    this.Examlink = null;
    this.Exammark = null;
    this.Examstarttime = null;
    this.Examendtime = null;

  }

  onAssignmentUpload(event: any) {
    const files = event.target.files;
    this.selectedFiles = [];
    this.selectedFilePaths = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type === 'application/pdf') {
        this.selectedFiles.push(file);
        this.selectedFilePaths.push(`D:\\FinalProject_(0)\\FinalProject\\src\\assets\\AssignmentFile\\assignmentFile${i}.pdf`);
      } else {
        alert('Please upload valid PDF files only');
      }
    }
  }


  submitAssignments() {
    debugger
    if (this.trainerCourseId && this.assignmentMark && this.assignmentDuration && this.selectedFilePaths.length > 0) {
      const assignmentData = {
        trainercourse: this.trainerCourseId,
        assignmentmark: this.assignmentMark,
        assignmentDuration: this.assignmentDuration,
        assignmentfile: this.selectedFilePaths[0]
      };

      this.assignmentService.submitAssignment(assignmentData).subscribe({
        next: (response) => {
          this.uploadSuccess = 'Assignments uploaded successfully!';
          const file = this.selectedFilePaths[0]; // Assuming this is the file object from the input
          const fileName = 'assignmentFile.pdf';
          saveAs(file, fileName);

          this.closeAssignmentModal();
        },
        error: (error) => {
          this.uploadError = 'Failed to upload assignments.';
          console.error(error);
        }
      });
    } else {
      alert('Please fill out all fields and select files');
    }
  }
  submitExam() {
    const examData = {
      Trainercourse: this.trainerCourseId,
      Examlink: this.Examlink,
      Exammark: this.Exammark,
      Examstarttime: this.Examstarttime ? new Date(this.Examstarttime).toISOString() : null,
      Examendtime: this.Examendtime ? new Date(this.Examendtime).toISOString() : null
    };
    debugger
    this.examService.createExam(examData).subscribe(
      response => {
        console.log('Exam created successfully:', response);
        this.closeModalExamModal();
      },
      error => {
        console.error('Error creating exam:', error);
      }
    );
  }
  submitAttendance() {

  }
  closeModalAttendanceModal() {
    this.isModalAttendanceOpen = false;

  }
  openTakeAttendanceModal(tsid: number): void {
    this.isModalAttendanceOpen = true;
    this.loadAttendanceData(tsid);
  }

  loadAttendanceData(tsid: number): void {
    this.attendanceService.getSectionAttendanceStatus(tsid).subscribe(
      (data: UserAttendanceDTO[]) => {
        this.sectionAttendance = data;
      },
      error => {
        console.error('Error fetching attendance data:', error);
      }
    );
  }
  saveAttendance() {
    const currentDateTime = new Date();  // Get the current date and time
    debugger
    // Loop through the sectionAttendance array and log the data
    this.sectionAttendance.forEach(user => {
      const attendanceData = {
        Seat: user.seat,
        Tsid: this.course!.tsid,
        Traineeid: user.userId,
        Attendancedate: currentDateTime.toISOString(),  // Format as ISO string (e.g., '2024-11-09T14:30:00.000Z')
        Status: user.status
      };
      console.log(attendanceData);
    });
  }
  updateStatus(user: any) {
    user.status = user.status == true ? 'Present' : 'Absent';
  }
}


