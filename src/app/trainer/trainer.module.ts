import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { trainerRoutingModule } from './trainer-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageCourseComponent } from './manage-course/manage-course.component';
import { CourseComponent } from './course/course.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ContentmaterialComponent } from './contentmaterial/contentmaterial.component';
import { ProfileComponent } from './profile/profile.component';

;


@NgModule({
  declarations: [

    DashboardComponent,
    ManageCourseComponent,
    CourseComponent,
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
