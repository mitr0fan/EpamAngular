import { Routes } from '@angular/router';
import { CoursesComponent } from './courses-list/courses/courses.component';
import { LoginComponent } from './login-page/login/login.component';

export const appRoutes: Routes = [
    { path: 'courses', component: CoursesComponent },
    { path: '', redirectTo: '/courses', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
];
