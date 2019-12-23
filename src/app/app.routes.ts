import { Routes } from '@angular/router';
import { LoginComponent } from './login-page/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CoursesComponent } from './courses-list/courses/courses.component';
import { EditCourseComponent } from './courses-list/edit-course/edit-course.component';
import { CanActivateGuardService } from './can-activate-guard.service';
import { LoginGuardService } from './login-guard.service';
import { DATA } from 'common/constants';

const routes = DATA.ROUTES;

export const appRoutes: Routes = [
    { path: routes.emptyRoute, redirectTo: '/login', pathMatch: 'full' },
    { path: routes.loginRoute, component: LoginComponent, canActivate: [LoginGuardService] },
    { path: routes.coursesRoute, component: CoursesComponent, canActivate: [CanActivateGuardService] },
    { path: routes.createNewCourseRoute, component: EditCourseComponent, canActivate: [CanActivateGuardService] },
    { path: routes.editCourseRoute, component: EditCourseComponent, canActivate: [CanActivateGuardService] },
    { path: routes.errorRoute, component: PageNotFoundComponent },
];
