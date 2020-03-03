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
    COURSES_SERVER: 'http://localhost:3000/660/courses',
    USERS_SERVER: 'http://localhost:3000/660/users',
    SERVER: 'http://localhost:3000',
    AUTHORS_SERVER: 'http://localhost:3000/660/authors',
    LOCAL_STORAGE: {
        userInfo: 'userInfo',
        authToken: 'authToken',
    },
};

