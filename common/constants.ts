import { environment } from 'src/environments/environment';

interface Data {
    ROUTES: any;
    COURSES_SERVER: string;
    USERS_SERVER: string;
    SERVER: string;
    AUTHORS_SERVER: string;
    LOCAL_STORAGE: {
        userInfo: string;
        authToken: string;
    };
}

export const DATA: Data = {
    ROUTES: {
        emptyRoute: '',
        loginRoute: 'login',
        coursesRoute: 'courses',
        createNewCourseRoute: 'new',
        editCourseRoute: ':id',
        redirectToLogin: '/login',
        errorRoute: '**',
    },
    COURSES_SERVER: `${environment.server}/courses`,
    USERS_SERVER: `${environment.server}/users`,
    SERVER: environment.server,
    AUTHORS_SERVER: `${environment.server}/authors`,
    LOCAL_STORAGE: {
        userInfo: 'userInfo',
        authToken: 'authToken',
    },
};

