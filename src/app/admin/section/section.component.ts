import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SectionService } from 'src/app/services/section.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  @ViewChild('callDeleteDialog') deleteDialog !: TemplateRef<any>;  
  @ViewChild('callUpdateDialog') updateDialog !: TemplateRef<any>;  
  @ViewChild('createSectionDialog') createSectionDialog !: TemplateRef<any>;
  @ViewChild('createCourseDialog') createCourseDialog !: TemplateRef<any>;
  @ViewChild('sectionsDialog') sectionsDialog!: TemplateRef<any>;

  _filterText: string = ''; 
  courses: any[] = [];
  trainers: any[] = [];
  selectedCourse: any = {};
  sectionForm: FormGroup;
  courseForm: FormGroup;
  selectedImage: File | null = null;

  constructor(public sectionService: SectionService, public dialog: MatDialog) {
    this.sectionForm = new FormGroup({
      alltraineefile: new FormControl('', Validators.required),
      sectionlink: new FormControl(''),
      sectionstarttime: new FormControl(''),
      sectionendtime: new FormControl(''),
     
    });

    this.courseForm = new FormGroup({
      coursename: new FormControl('', Validators.required),
      courseimage: new FormControl(''),
      coursestartdate: new FormControl(''),
      courseenddate: new FormControl(''),
     
    });
  }

  ngOnInit(): void {
    this.getCourses();
    this.getTrainers();
  }

  // جلب جميع الدورات
  getCourses() {
    this.sectionService.getAllCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  // جلب جميع المدربين
  getTrainers() {
    this.sectionService.getAllTrainers().subscribe((data) => {
      this.trainers = data;
    });
  }

  // فتح نموذج إنشاء دورة جديدة
  openCreateCourseDialog() {
    this.dialog.open(this.createCourseDialog);
  }

  // حفظ دورة جديدة
  saveCourse() {
    const newCourse = this.courseForm.value;
    if (this.selectedImage) {
      this.uploadImage(this.selectedImage).then((imagePath) => {
        newCourse.imagename = imagePath;
        this.sectionService.createCourse(newCourse).subscribe(() => {
          this.getCourses();
          this.courseForm.reset();
          this.selectedImage = null;
        });
      });
    } else {
      this.sectionService.createCourse(newCourse).subscribe(() => {
        this.getCourses();
        this.courseForm.reset();
      });
    }
  }

  // دالة رفع الصورة باستخدام firstValueFrom
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    // استخدام firstValueFrom لتحويل Observable إلى Promise
    const response = await firstValueFrom(this.sectionService.uploadAttachment(formData)) as { filePath: string };
    return response.filePath;
     // تأكد من أن هذا يتطابق مع الاستجابة الحقيقية من الخادم
  }

  // التعامل مع تغيير الصورة
  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  // فتح نموذج إضافة قسم جديد لدورة معينة
  openCreateSectionDialog(course: any) {
    this.selectedCourse = course;
    this.dialog.open(this.createSectionDialog);
  }

  // حفظ قسم جديد
  saveSection() {
    const newSection = this.sectionForm.value;
    this.sectionService.createSection(this.selectedCourse.courseId, newSection).subscribe(() => {
      this.getSections(this.selectedCourse.courseId);
      this.sectionForm.reset();
    });
  }

  // جلب الأقسام لدورة معينة
  getSections(courseId: number) {
    this.sectionService.getSections(courseId).subscribe((data) => {
      this.selectedCourse.sections = data;
    });
  }

  // فتح نافذة تعديل قسم
  openUpdateDialog(section: any) {
    this.sectionForm.patchValue(section);
    this.dialog.open(this.updateDialog);
  }

  // تحديث القسم
  updateSection() {
    const updatedSection = this.sectionForm.value;
    this.sectionService.updateSection(this.selectedCourse.courseId, updatedSection.sectionId, updatedSection).subscribe(() => {
      this.getSections(this.selectedCourse.courseId);
    });
  }

  // حذف القسم
  deleteSection(sectionId: number) {
    this.sectionService.deleteSection(this.selectedCourse.courseId, sectionId).subscribe(() => {
      this.getSections(this.selectedCourse.courseId);
    });
  }

  openSectionsDialog(course: any) {
    this.selectedCourse = course;
    this.getSections(course.courseId); // جلب الأقسام المرتبطة بالدورة
    this.dialog.open(this.sectionsDialog); // فتح الحوار لعرض الأقسام
  }

  get filteredCourses() {
    if (!this._filterText) return this.courses;
    return this.courses.filter(course =>
      course.coursename.toLowerCase().includes(this._filterText.toLowerCase())
    );
  }
}
