import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private baseUrl = 'https://localhost:7276/api/Material/uploadMaterial'; 

  constructor(private http: HttpClient) {}

  uploadMaterial(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/uploadMaterial`, formData);
  }

 
}
