import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ManageCourseComponent } from './manage-course/manage-course.component';
import { SectionComponent } from './section/section.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { ReportsComponent } from './reports/reports.component';
import { CreateCourseComponent } from './create-course/create-course.component';

const routes: Routes = [


  {
    path: 'dashboard',
    component: DashbordComponent
  },
  
  {
    path: 'create-course',
    component: CreateCourseComponent
  },
  
  {
    path: 'manageCourse',
    component: ManageCourseComponent
  },

  {
    path: 'section',
    component: SectionComponent
  },
  {
    path: 'employee',
    component: EmployeeListComponent
  }
  ,
  {
    path: 'Profile',
    component: ProfileComponent
  }
  ,
  {
    path: 'reports',
    component: ReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
