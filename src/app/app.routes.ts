import { Routes } from '@angular/router';
import { LoginComponent } from './login-page/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanActivateGuardService } from './services/can-activate-guard.service';
import { LoginGuardService } from './services/login-guard.service';
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
        loadChildren: () => import('./courses-list/courses-list.module').then(m => m.CoursesListModule),
        canActivate: [CanActivateGuardService],
        data: { animation: 'CoursesPage' },
    },
    { path: routes.errorRoute, component: PageNotFoundComponent },
];
