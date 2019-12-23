import { Routes } from '@angular/router';
import { LoginComponent } from './login-page/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CoursesComponent } from './courses-list/courses/courses.component';
import { EditCourseComponent } from './courses-list/edit-course/edit-course.component';
import { CanActivateGuardService } from './can-activate-guard.service';
import { LoginGuardService } from './login-guard.service';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuardService] },
    { path: 'courses', component: CoursesComponent, canActivate: [CanActivateGuardService] },
    { path: 'courses/new', component: EditCourseComponent, canActivate: [CanActivateGuardService] },
    { path: 'courses/:id', component: EditCourseComponent, canActivate: [CanActivateGuardService] },
    { path: '**', component: PageNotFoundComponent },
];
