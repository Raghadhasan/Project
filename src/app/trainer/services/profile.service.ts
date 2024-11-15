import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profile: any;
  constructor(public http: HttpClient) { }
  getUser(id: any): Observable<any> {
    debugger;
    return this.http.get('https://localhost:7276/api/User/GetUserById/' + id)
  }
  updateUser(userData: any): Observable<any> {
    return this.http.put('https://localhost:7276/api/User/Update', userData);
  }
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post('https://localhost:7276/api/User/UploadImage', formData);
  }
}
