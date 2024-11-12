// src/app/trainee-attendance/trainee-attendance.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AttendanceService } from '../services/attendance.service';
//import { Trainee } from '../trainee.model';
//import { AttendanceService } from '../attendance.service';



@Component({
  selector: 'app-trainee-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class TraineeAttendanceComponent implements OnInit {
  trainees: { id: number, name: string, solution: string, present: boolean }[] = [
    { id: 1, name: 'Trainee 1', solution: '', present: false },
    { id: 2, name: 'Trainee 2', solution: '', present: false },

  ];

  attendanceForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    solution: new FormControl('', Validators.required),
    mark: new FormControl('', [Validators.min(0), Validators.max(100)])
  });

  constructor(private attendanceService: AttendanceService) { }

  ngOnInit(): void { }

  toggleAttendance(trainee: any): void {
    trainee.present = !trainee.present;
  }

  // submitAttendance(): void {

  //   this.attendanceService.submitAttendance(this.trainees).subscribe({
  //     next: (response: any) => {
  //       console.log('Attendance submitted successfully:', response);

  //     },
  //     error: (error: any) => {
  //       console.error('Error submitting attendance:', error);
  //       }
  //     }
  //   );
  // }
}
