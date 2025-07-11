import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { FiltersComponent } from '../../shared/components/ui/filters/filters.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignUpComponent,
    ForgetPasswordComponent,
    AccountsComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
