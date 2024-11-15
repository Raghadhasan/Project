import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from './shared/shared.module';
import {trainerRoutingModule} from './trainer-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ManageCourseComponent} from './manage-course/manage-course.component';
import {TrainerUploadComponent} from './trainer-upload/trainer-upload.component';
import {CourseComponent} from './course/course.component';
import {UploadMaterialComponent} from './upload-material/upload-material.component';
import {AssignmentReviewComponent} from './assignment-review/assignment-review.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {TraineeSolutionsComponent} from './trainee-solutions/trainee-solutions.component';
import {TraineeMarksComponent} from './trainee-marks/trainee-marks.component';
import {TraineeAttendanceComponent} from './attendance/AttendanceComponent';
import { ContentmaterialComponent } from './contentmaterial/contentmaterial.component';
import { ProfileComponent } from './profile/profile.component';

;


@NgModule({
  declarations: [

    DashboardComponent,
    ManageCourseComponent,
    TrainerUploadComponent,
    CourseComponent,
    UploadMaterialComponent,
    AssignmentReviewComponent,
    TraineeSolutionsComponent,
    TraineeMarksComponent,
    TraineeAttendanceComponent,
    ContentmaterialComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    trainerRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
  ],
  exports: [DashboardComponent],
})
export class TrainerModule { }
