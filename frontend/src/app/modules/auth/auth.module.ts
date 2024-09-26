import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { MaterialModule } from '../material/material.module';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    RecoverPasswordComponent,
    ActivateAccountComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, FormsModule, MaterialModule],
})
export class AuthModule {}
