import { Routes } from '@angular/router';
import { CoursesComponent } from './courses-list/courses/courses.component';


export const appRoutes: Routes = [
    { path: 'courses', component: CoursesComponent },
    { path: '',
      redirectTo: '/courses',
      pathMatch: 'full'
    }
];
