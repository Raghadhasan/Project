import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ManageAboutComponent } from './manage-about/manage-about.component';
import { ToastrModule } from 'ngx-toastr';
import { ExcelesheetComponent } from './excelesheet/excelesheet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { trainerRoutingModule } from './trainer/trainer-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';

// إضافة الوحدات المطلوبة من Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ManageAboutComponent,
    ExcelesheetComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    AdminRoutingModule,
    BrowserAnimationsModule,
    trainerRoutingModule,
    MatCardModule,
    MatOptionModule,
    RouterModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,

    // الوحدات الجديدة من Angular Material
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatIconModule, // Add MatIconModule to imports


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
