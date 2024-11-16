import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ManageCourseComponent } from './manage-course/manage-course.component';
import { SectionComponent } from './section/section.component';

const routes: Routes = [


  {
    path: 'dashboard',
    component: DashbordComponent
  },

  {
    path: 'manageCourse',
    component: ManageCourseComponent
  },

  {
    path: 'section',
    component: SectionComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
