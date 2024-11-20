import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TraineecertificateDto {
  trianeeid?: number;
  trianeeName?: string;
  courseName?: string;
  traineeMark?: number;
  tsid?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CerficationService {
  private apiUrl = 'https://localhost:7276/api/Cerfication';


  constructor(private http: HttpClient) { }

  getCertification(courseId: number): Observable<TraineecertificateDto[]> {
    return this.http.get<TraineecertificateDto[]>(`${this.apiUrl}/GetCerfication/${courseId}`);
  }
  issueCertificate(courseId: number, traineeId: number): Observable<Blob> {
    const url = `${this.apiUrl}/ViewCerfication/${courseId}/${traineeId}`;
    return this.http.get(url, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'application/pdf'
      })
    });
  }
}
