import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthtrainerRoutingModule } from './authtrainer-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthtrainerRoutingModule,
    SharedModule
  ]
})
export class AuthtrainerModule { }
