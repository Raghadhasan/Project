import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  uploadAttachment(formData: FormData) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://localhost:7276/api/Course/GetAllCourse';

  constructor(private http: HttpClient) {}

  // جلب جميع الدورات
  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // جلب جميع المدربين
  getAllTrainers(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7276/api/Trainer/GetAll');
  }

  // جلب جميع الأقسام الخاصة بدورة معينة
  getSections(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${courseId}/sections`);
  }

  // إنشاء قسم جديد لدورة معينة
  createSection(courseId: number, section: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/sections`, section);
  }

  // إنشاء دورة جديدة
  createCourse(course: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, course);
  }

  // تحديث قسم معين
  updateSection(courseId: number, sectionId: number, section: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}/sections/${sectionId}`, section);
  }

  // حذف قسم معين من دورة
  deleteSection(courseId: number, sectionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}/sections/${sectionId}`);
  }

  // تحديث دورة معينة
  updateCourse(courseId: number, course: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}`, course);
  }

  // حذف دورة معينة
  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}`);
  }
}
