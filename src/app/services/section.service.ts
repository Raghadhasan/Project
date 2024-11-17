import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private apiUrl = 'https://localhost:7276/api/Trainer';

  TrainerSections: any = [];

  constructor(private http: HttpClient) { }


  getAllTrainerSections() {
    debugger;
    this.http.get<any[]>(`${this.apiUrl}/GetAll`).subscribe(res => {
      this.TrainerSections = res;
      return res;
    }, err => {
      console.log(err.message);
    });
  }



  createSection(section: any) {
    debugger;
    this.http.post(`${this.apiUrl}/CreateTSection`, section).subscribe(
      (response) => {
        this.getAllTrainerSections();
        return response;
      }, (error) => {
        return error;
        console.log(error)
      }
    );
  }



  updateSection(section: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateTSection`, section);

  }

  deleteSection(trainerSectionId: number): Observable<any> {
    return this.http.delete(`https://localhost:7276/api/Trainer/DeleteTsection/${trainerSectionId}`);
  }
  downloadTemplate(): Observable<Blob> {
    const apiUrl = `${this.apiUrl}/TemplateTrainee`;
    return this.http.get(apiUrl, { responseType: 'blob' });
  }
  uploadTraineeFile(file: File, user_id: any, courseId: number, tsid: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    const url = `https://localhost:7276/api/Trianee/UploadTraineeData?courseid=${courseId}&tsid=${tsid}&user_id=${user_id}`;

    return this.http.post(url, formData);
  }

}
