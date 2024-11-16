import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private apiUrl = 'https://localhost:7276/api/Trainer'; // نقطة النهاية للدورات
  private uploadUrl = 'https://localhost:7276/api/YourUploadEndpoint'; // نقطة النهاية لرفع الملفات

  TrainerSections: any = [];

  constructor(private http: HttpClient) { }

  // دالة رفع الملف التي تعيد Observable
  uploadAttachment(formData: FormData): Observable<{ filePath: string }> {
    return this.http.post<{ filePath: string }>(this.uploadUrl, formData);
  }

  // جلب جميع المدربين
  getAllTrainerSections() {
    debugger;
    this.http.get<any[]>(`${this.apiUrl}/GetAll`).subscribe(res => {
      this.TrainerSections = res;
      return res;
    }, err => {
      console.log(err.message);
    });
  }



  // إنشاء قسم جديد لدورة معينة
  createSection(section: any) {
    debugger;
    this.http.post(`${this.apiUrl}/CreateTSection`, section).subscribe(
      (response) => {
        return response;
      }, (error) => {
        return error;
        console.log(error)
      }
    );
  }



  // تحديث قسم معين
  updateSection(section: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateTSection`, section);
  }

  // حذف قسم معين من دورة
  deleteSection(trainerSectionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/sections/${trainerSectionId}`);
  }
}
