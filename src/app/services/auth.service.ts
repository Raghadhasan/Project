import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<string> {
    return this.http.post('https://localhost:7276/api/Login/Login', credentials, {
      responseType: 'text'
    });
  }
}
