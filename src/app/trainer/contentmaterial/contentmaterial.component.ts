import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CourseService, UserCourses } from '../services/course.service';
import { HttpClient } from '@angular/common/http';
import { Assignment, AssignmentDetailsDto, AssignmentService } from '../services/assignment.service';
import { saveAs } from 'file-saver';
import { Exam, ExamsectionService } from '../services/examsection.service';
import { AttendanceService, UserAttendanceDTO } from '../services/attendance.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-contentmaterial',
  templateUrl: './contentmaterial.component.html',
  styleUrls: ['./contentmaterial.component.css']
})

export class ContentmaterialComponent implements OnInit {
  @Input() course: UserCourses | null = null;
  //#region varalbie
  selectedFile: File | null = null;
  selectedFiles: File[] = [];
  uploadSuccess: string = '';
  uploadError: string = '';
  isModalOpen: boolean = false;
  trainerCourseId: number | null = null;
  assignmentMark: number | null = null;
  assignmentDuration: string | null = null;
  selectedFilePaths: string[] = [];

  assignments: Assignment[] = [];

  isModalExamOpen: boolean = false;
  Examlink: number | null = null;
  Exammark: number | null = null;
  Examstarttime: string | null = null;
  Examendtime: string | null = null;


  isModalAttendanceOpen: boolean = false;
  isModalShowSolutionOpen: boolean = false;
  solutionDetails: AssignmentDetailsDto[] = [];
  selectedAssignmentId: number | null = null;
  sectionAttendance: UserAttendanceDTO[] = [];
  exams: Exam[] = [];

  //#endregion


  constructor(
    private courseService: CourseService,
    private assignmentService: AssignmentService,
    private examService: ExamsectionService,
    private attendanceService: AttendanceService,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.loadingAssignment()
    this.loadingExams();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['course'] && this.course) {
      this.trainerCourseId = this.course.tsid;
    }
  }
  loadingExams() {
    this.examService.getExams(this.course!.tsid).subscribe(
      (data: Exam[]) => {
        this.exams = data;
      },
      error => {
        console.error('Error fetching exams', error);
      }
    );
  }

  loadingAssignment() {
    debugger
    this.assignmentService.GetAllAssignmentByCoursid(this.course!.tsid).subscribe({
      next: (response) => {
        this.assignments = response.map(item => new Assignment(item));
      },
      error: (error) => {

        console.error(error);
      }
    });
  }
  replaceFilePath(path: string) {
    return path.replace('D:\\Project\\src\\', '');
  }

  //#region  Material Upload 
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
  //#endregion

  //#region Attendance
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
  //#endregion

  //#region Assignment
  openAssignmentModal() {
    debugger
    this.isModalOpen = true;

  }
  openAssignmentSolutionModal(assignmentId: number) {
    debugger
    this.isModalShowSolutionOpen = true;
    this.fetchAssignmentDetails(assignmentId);

  }
  fetchAssignmentDetails(assignmentId: number): void {
    let User_Id = localStorage.getItem('User_Id')

    const courseId = this.course?.courseid || 0;
    const sectionId = this.course?.tsid || 0;
    const trainerId = User_Id || "0";

    this.assignmentService
      .getAssignmentDetails(courseId, sectionId, trainerId, assignmentId)
      .subscribe(
        (data) => {
          this.solutionDetails = data;
          this.isModalShowSolutionOpen = true;
        },
        (error) => {
          this.solutionDetails = [];
          this.toastr.error('Failed to load assignment details.', 'Error');
          console.error(error);
        }
      );
  }
  isPdf(fileName: string | null): boolean {
    return fileName ? fileName.toLowerCase().endsWith('.pdf') : false;
  }

  openFile(filePath: string | null): void {
    if (filePath) {
      const cleanedPath = this.cleanFilePath(filePath);
      window.open(cleanedPath, '_blank');
    } else {
      this.toastr.warning('File not available.', 'Warning');
    }
  }

  downloadFile(filePath: string | null): void {
    if (filePath) {
      const cleanedPath = this.cleanFilePath(filePath);
      const link = document.createElement('a');
      link.href = cleanedPath;
      link.download = cleanedPath.split('/').pop() || 'file';
      link.click();
    } else {
      this.toastr.warning('File not available.', 'Warning');
    }
  }
  submitMarks(): void {
    const payload = this.solutionDetails.map(solution => ({
      traineeid: solution.traineE_ID,
      assignmentid: solution.assignmentId,
      mark: solution.assignmentMark
    }));

    this.assignmentService.updateMark(payload).subscribe({
      next: () => {
        alert('Marks updated successfully');
        this.isModalShowSolutionOpen = false;
      },
      error: (err) => {
        console.error('Error updating marks:', err);
        alert('Failed to update marks. Please try again.');
      }
    });
  }
  cleanFilePath(filePath: string): string {
    // Define the prefix to remove
    const prefix = 'file:///D:/Project/';
    // Replace the prefix with a relative path or return as is
    return filePath.startsWith(prefix) ? filePath.replace(prefix, '/assets/') : filePath;
  }

  closeAssignmentModal() {
    this.isModalOpen = false;
    this.selectedFiles = [];
    this.assignmentMark = null;
    this.assignmentDuration = null;
  }
  onAssignmentUpload(event: any) {
    const files = event.target.files;
    this.selectedFiles = [];
    this.selectedFilePaths = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type === 'application/pdf') {
        this.selectedFiles.push(file);
        this.selectedFilePaths.push(`D:\\Project\\src\\assets\\AssignmentFile\\assignmentFile${i}.pdf`);
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
  //#endregion


  onExamUpload(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
    } else {
      this.toastr.error('Please upload a valid PDF file', 'Error');

    }
  }
  onExamUploadModal() {
    this.isModalExamOpen = true;
  }
  closeModalExamModal() {
    this.isModalExamOpen = false;
    this.Examlink = null;
    this.Exammark = null;
    this.Examstarttime = null;
    this.Examendtime = null;

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


  openFile1(file: string | null): void {
    debugger
    if (file) {
      const basePath = 'D:\\Project\\src\\';
      const relativePath = file.replace(basePath, '');
      console.log('Opening file:', relativePath);
      window.open(relativePath, '_blank');
    } else {
      console.error('File path or URL is null or invalid.');
    }
  }

  //#region

  downloadFile1(fileUrl: string | null): void {
    if (fileUrl) {
      console.log('Downloading file:', fileUrl);
      const anchor = document.createElement('a');
      anchor.href = fileUrl;
      anchor.download = fileUrl.split('/').pop() || 'file';
      anchor.click();
    } else {
      console.error('File URL is null or invalid.');
    }
  }

  isPdf1(fileUrl: string | null): boolean {
    if (!fileUrl) {
      console.error('File URL is null');
      return false;
    }
    const fileExtension = fileUrl.split('.').pop()?.toLowerCase();
    return fileExtension === 'pdf';
  }


  //#endregion

}








