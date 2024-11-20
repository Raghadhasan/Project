import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ManageCourseComponent } from './manage-course/manage-course.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { SharedModule } from '../shared/shared.module';
import { SectionComponent } from './section/section.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { CourseFilterPipe } from '../Pipe/course-filter-pipe-.pipe';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './profile/profile/profile.component';
import { ReportsComponent } from './reports/reports.component';
import { TableComponent } from './table/table.component';


@NgModule({
  declarations: [
    SidebarComponent,
    DashbordComponent,
    ManageCourseComponent,
    CreateCourseComponent,
    SectionComponent,
    EmployeeListComponent,
    CourseFilterPipe,
    ProfileComponent,
    ReportsComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    MatIconModule, 

  ]
})
export class AdminModule { }
