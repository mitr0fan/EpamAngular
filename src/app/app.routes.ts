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
    { path: routes.emptyRoute, redirectTo: routes.redirectToLogin, pathMatch: 'full' },
    {
        path: routes.loginRoute,
        component: LoginComponent,
        canActivate: [LoginGuardService],
        data: { animation: 'LoginPage' },
    },
    {
        path: routes.coursesRoute,
        component: CoursesComponent,
        canActivate: [CanActivateGuardService],
        data: { animation: 'CoursesPage' },
    },
    {
        path: routes.createNewCourseRoute,
        component: EditCourseComponent,
        canActivate: [CanActivateGuardService],
        data: { animation: 'EditPage' },
    },
    {
        path: routes.editCourseRoute,
        component: EditCourseComponent,
        canActivate: [CanActivateGuardService],
        data: { animation: 'EditPage' },
    },
    { path: routes.errorRoute, component: PageNotFoundComponent },
];
