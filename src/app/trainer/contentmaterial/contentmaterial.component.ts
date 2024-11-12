import { Component, Input, SimpleChanges } from '@angular/core';
import { CourseService, UserCourses } from '../services/course.service';
import { HttpClient } from '@angular/common/http';
import { AssignmentService } from '../services/assignment.service';
import { saveAs } from 'file-saver';
import { ExamsectionService } from '../services/examsection.service';
import { AttendanceService, UserAttendanceDTO } from '../services/attendance.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
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
      this.toastr.error('Please upload a valid PDF file', 'Error');

    }
  }
  getFilePath() {
    if (this.course!.alltraineefile) {
      return this.course!.alltraineefile.replace('D:\\Project\\src\\', '');
    }
    return '';
  }


  onCourseMaterialUpload(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      this.toastr.error('Please upload a valid PDF file', 'Error');

    }
  }

  SaveCourseMaterial() {
    if (!this.selectedFile) {
      this.toastr.error('Please attach a file before saving.', 'Error');

      return;
    }

    this.uploadFile(this.selectedFile);
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const TSID = this.course?.tsid || 0;

    this.courseService.uploadCourseMaterial(TSID, formData).subscribe(
      (response: string) => {
        console.log('File upload response:', response);
        this.toastr.success(response, 'Success',);
        this.course!.alltraineefile = response;
      },
      (error: any) => {
        console.error('Upload error:', error);
        this.toastr.error('File upload failed!', 'Error');
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
        this.toastr.error('Please upload valid PDF files only.', 'Error');

      }
    }
  }


  submitAssignments() {
    if (this.trainerCourseId && this.assignmentMark && this.assignmentDuration && this.selectedFilePaths.length > 0) {
      const assignmentData = {
        trainercourse: this.trainerCourseId,
        assignmentmark: this.assignmentMark,
        assignmentDuration: this.assignmentDuration,
        assignmentfile: this.selectedFilePaths[0]
      };

      this.assignmentService.submitAssignment(assignmentData).subscribe({
        next: (response) => {
          this.toastr.success('Assignments uploaded successfully!', 'Success');

          const file = this.selectedFilePaths[0];
          const fileName = 'assignmentFile.pdf';
          saveAs(file, fileName);

          this.closeAssignmentModal();
        },
        error: (error) => {
          this.toastr.error('Failed to upload assignments.', 'Error');

          console.error(error);
        }
      });
    } else {
      this.toastr.error('Please fill out all fields and select files.', 'Error');

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
    this.examService.createExam(examData).subscribe(
      response => {
        this.toastr.success('Exam created successfully!', 'Success');

        this.closeModalExamModal();
      },
      error => {
        this.toastr.error('Error creating exam.', 'Error');

      }
    );
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
    const attendanceData: UserAttendanceDTO[] = this.sectionAttendance.map(user => {
      return {
        userId: user.userId,
        userName: user.userName,
        seat: user.seat,
        status: user.status == null ? 'Absent' : user.status,
      };
    });

    this.attendanceService.submitAttendance(attendanceData).subscribe(
      response => {
        this.isModalAttendanceOpen = false;
        this.toastr.success('Attendance submitted successfully', 'Success');
      },
      error => {
        this.toastr.error('Error submitting attendance.', 'Error');
      }
    );
  }

  isUserPresent(user: any): boolean {
    return user.status === 'Present';
  }

  updateStatus(user: any, isPresent: boolean): void {
    user.status = isPresent ? 'Present' : 'Absent';
  }

}


