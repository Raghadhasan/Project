import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageCourseComponent } from './manage-course/manage-course.component';
import { CourseComponent } from './course/course.component';
import { ProfileComponent } from './profile/profile.component';


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
        path: '',
        component: CourseComponent,
      },


      {
        path: 'my-courses',
        component: CourseComponent,
      },
    
      {
        path: 'profile/:id',
        component: ProfileComponent
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
