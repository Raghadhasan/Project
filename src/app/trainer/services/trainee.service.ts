// src/app/trainee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from "rxjs";
import {Profile} from "../profile";

class TraineeProfile {
}

@Injectable({
  providedIn: 'root'
})
export class TraineeService {
  trainees: any;


  constructor(private http: HttpClient) {}
  submitMarks(payload:any) {
   return this.http.post('https://localhost:7276/api/Course/SubmitMarks', payload)
  }

  getProfile(traineeId: number): Observable<Profile> {
    return this.http.get<Profile>(`https://localhost:7276/api/${traineeId}`).pipe(
      map(response => {
        // TypeScript now knows that 'response' should be a Profile
        return {
          id: response.id,
          name: response.name,
          email: response.email,
          phone: response.phone,
          address: response.address
        } as Profile;
      })
    );
  }

  updateProfile(updatedProfile: TraineeProfile) {
    return this.http.put('https://localhost:7276/api/Course/SubmitMarks', updatedProfile);
  }
}
