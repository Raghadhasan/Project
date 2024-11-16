import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface UserProfile {
  userid: number;
  username: string;
  userimage: string;
  useremail: string;
  roleid: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7276/api/User';

  constructor(private http: HttpClient) { }

  getUserProfile(userId: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/GetUserProfile/${userId}`);
  }

  updateUserProfile(userProfile: UserProfile): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateUserProfile`, userProfile);
  }
  getAllUsers() {
    return this.http.get<UserProfile[]>(`${this.apiUrl}/GetAllUsers`);
  }
}

