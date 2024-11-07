// src/app/trainee-marks/trainee-marks.component.ts
import { Component, OnInit } from '@angular/core';
import { TraineeService } from '../services/trainee.service';
//import { Trainee } from '../trainee.model';
//import { TraineeService } from '../trainee.service';

@Component({
  selector: 'app-trainee-marks',
  templateUrl: './trainee-marks.component.html',
  styleUrls: ['./trainee-marks.component.css']
})
export class TraineeMarksComponent implements OnInit {
  trainees: any[] = [
    { id: 1, name: 'Trainee 1', solution: 'Solution content for trainee 1' },
    { id: 2, name: 'Trainee 2', solution: 'Solution content for trainee 2' },
  
  ];

  constructor(private traineeService: TraineeService) {}

  ngOnInit(): void {}

  submitMarks(): void {
    this.traineeService.submitMarks(this.trainees).subscribe(response=> {
      console.log('Marks submitted successfully', response);
    });
  }
}
