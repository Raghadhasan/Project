import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Exam {
  examlink: string | null;
  coursename: string;
  exammark: number | null;
  examstarttime: string | null;
  examendtime: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ExamsectionService {
  private apiUrl = 'https://localhost:7276/api/Exam';

  constructor(private http: HttpClient) { }

  getExams(id: number): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.apiUrl}/GetExamLink/${id}`);
  }
  createExam(exam: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/CreateExam`, exam);
  }
}
