import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AssignmentSolution {
  id: number;
  traineeId: number;
  solution: string; 
  mark?: any; 
}

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private apiUrl = 'http://your-api-url/api'; 

  constructor(private http: HttpClient) { }

  getAssignmentSolutions(): Observable<AssignmentSolution[]> {
    return this.http.get<AssignmentSolution[]>(`${this.apiUrl}/GetAssignmentSolutions`);
  }


  updateMark(solutionId: number, mark: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateMark/${solutionId}`, { mark });
  }
}
