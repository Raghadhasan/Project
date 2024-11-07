import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ManageCourseComponent } from './manage-course/manage-course.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SidebarComponent,
    DashbordComponent,
    ManageCourseComponent,
    CreateCourseComponent
   
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
   SharedModule
  
  ]
})
export class AdminModule { }
