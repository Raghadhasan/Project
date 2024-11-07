// src/app/trainee-solutions/trainee-solutions.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-trainee-solutions',
  templateUrl: './trainee-solutions.component.html',
  styleUrls: ['./trainee-solutions.component.css']
})
export class TraineeSolutionsComponent implements OnInit {
  traineesForm: FormArray;

  constructor(private fb: FormBuilder) {
    this.traineesForm = this.fb.array([
      this.createTraineeForm(1, 'Trainee 1', 'Solution content for trainee 1'),
      this.createTraineeForm(2, 'Trainee 2', 'Solution content for trainee 2')
    ]);
  }

  ngOnInit(): void {}

  createTraineeForm(id: number, name: string, solution: string): FormGroup {
    return new FormGroup({
      id: new FormControl(id, Validators.required),
      name: new FormControl(name, Validators.required),
      solution: new FormControl(solution)
    });
  }

  get trainees(): FormArray {
    return this.traineesForm;
  }
}
