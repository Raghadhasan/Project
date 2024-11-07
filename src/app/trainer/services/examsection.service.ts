import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExamLink {
  id: number;
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExamsectionService {
  private apiUrl = 'https://localhost:7276/api/Exam'; 

  constructor(private http: HttpClient) { }

  getExamLink(id: number): Observable<ExamLink> {
    return this.http.get<ExamLink>(`${this.apiUrl}/GetExamLink/${id}`);
  }
}
