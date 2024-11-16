import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'https://localhost:7276/api/User'; 

  constructor(private http: HttpClient) {}

  // GET: Get a user by ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetUserById/${id}`);
  }

  // PUT: Update a user
  updateUser(user: any): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/Update`, user);
  }
  createUser(user: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/CreateUser`, user);
  }
  // POST: Upload an image
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/UploadImage`, formData);
  }

  // GET: Get all users
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/GetAllUsers`);
  }

  // GET: Get all trainer users
  getAllUsersTrainer(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/GetAllUsersTeainer`);
  }

  // DELETE: Delete a user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/DeleteUser/${id}`);
  }
}
