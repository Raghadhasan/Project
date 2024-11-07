import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageCourseComponent } from './manage-course/manage-course.component';
import { CourseComponent } from './course/course.component';
import { UploadMaterialComponent } from './upload-material/upload-material.component';
import { UploadAssignmentComponent } from './upload-assignment/upload-assignment.component';
import { TraineeProfileComponent } from './trainer-profile/trainer-profile.component';
import {TraineeSolutionsComponent} from './trainee-solutions/trainee-solutions.component';
import { TraineeMarksComponent } from './trainee-marks/trainee-marks.component';


const routes: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'courses',
        component: ManageCourseComponent,
      },
      {
        path: 'my-courses',
        component: CourseComponent,
      },

      {
        path: 'upload-material',
        component: UploadMaterialComponent,
      },
      {
        path: 'upload-assignment',
        component: UploadAssignmentComponent,

      },
      {
        path: 'trainee-marks',
        component: TraineeMarksComponent,

      },
      {
        path: 'trainer-profile',
        component: TraineeProfileComponent,

      },
      {
        path: 'trainee-solutions',
        component: TraineeSolutionsComponent,

      },

    ],
  },

  {
    path: 'ManageCourse',
    component: ManageCourseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class trainerRoutingModule { }
