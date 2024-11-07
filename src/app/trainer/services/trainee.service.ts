// src/app/trainee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {
  trainees: any;
 

  constructor(private http: HttpClient) {}
  submitMarks(payload:any) {
   return this.http.post('https://localhost:7276/api/Course/SubmitMarks', payload)
  }  
}
