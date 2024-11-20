import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AssignmentSolution {
  id: number;
  traineeId: number;
  solution: string;
  mark?: any;
}
export interface AssignmentDetailsDto {
  traineeId: number;
  traineeName: string;
  assignmentId: number;
  traineeSolution: string | null;
  assignmentMark: number;
}
export class Assignment {
  asec: number;
  trainercourse: number;
  assignmentfile: string;
  assignmentmark: number;
  assignmentduration: string;
  trainercourseNavigation: any;
  traineeassignmentsolutions: any[];

  constructor(data: any) {
    this.asec = data.asec;
    this.trainercourse = data.trainercourse;
    this.assignmentfile = data.assignmentfile;
    this.assignmentmark = data.assignmentmark;
    this.assignmentduration = data.assignmentduration;
    this.trainercourseNavigation = data.trainercourseNavigation;
    this.traineeassignmentsolutions = data.traineeassignmentsolutions;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private apiUrl = 'https://localhost:7276/api/Assignment';

  constructor(private http: HttpClient) { }
  updateMark(payload: any[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateMark`, payload);
  }
  getAssignmentSolutions(): Observable<AssignmentSolution[]> {
    return this.http.get<AssignmentSolution[]>(`${this.apiUrl}/GetAssignmentSolutions`);
  };
  GetAllAssignmentByCoursid(Trainercourse: number): Observable<AssignmentSolution[]> {
    return this.http.get<AssignmentSolution[]>(`${this.apiUrl}/GetAllAssignment?Trainercourse=${Trainercourse}`);
  };

  getAssignmentDetails(
    courseId: number,
    sectionId: number,
    trainerId: string,
    assignmentId: number
  ): Observable<AssignmentDetailsDto[]> {
    return this.http.get<AssignmentDetailsDto[]>(
      `${this.apiUrl}/GetAssignmentDetails?courseId=${courseId}&sectionId=${sectionId}&trainerId=${trainerId}&assignmentId=${assignmentId}`
    );
  }

  submitAssignment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/CreateAssignment`, data);
  }
}
