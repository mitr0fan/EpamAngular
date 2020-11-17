import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
    declarations: [LoginComponent, RegistrationComponent],
    imports: [CommonModule, MatInputModule, RouterModule, FormsModule, ReactiveFormsModule],
    exports: [LoginComponent],
})
export class LoginPageModule {}
