import { Course } from 'src/app/course';
import { User } from 'src/app/user';

interface Data {
    COURSES: Course[];
    FAKE_USERS: User[];
    ROUTES: any;
    COURSES_SERVER: string;
}

const today = new Date().getTime();
const differenceDateMs = 1000000000;
const durationMs = 3600000;
const differenceDurationMs = 1500000;

export const DATA: Data = {
    COURSES: [
        {
            id: 1,
            title: 'Video Course 1',
            date: today - 5 * differenceDateMs,
            duration: durationMs + Math.ceil(differenceDurationMs * 0.6),
            description: 'The best course ever!!!!!',
            topRated: false,
        },
        {
            id: 2,
            title: 'Video Course 2',
            date: today - differenceDateMs,
            duration: durationMs - differenceDurationMs,
            description: 'The best course ever!!!!!',
            topRated: true,
        },
        {
            id: 3,
            title: 'Video Course 3',
            date: today + 2 * differenceDateMs,
            duration: durationMs + differenceDurationMs,
            description: 'The best course ever!!!!!',
            topRated: false,
        },
        {
            id: 4,
            title: 'Video Course 4',
            date: today - 3 * differenceDateMs,
            duration: durationMs +  Math.ceil(differenceDurationMs * 3),
            description: 'The best course ever!!!!!',
            topRated: true,
        },
        {
            id: 5,
            title: 'Video Course 5',
            date: today,
            duration: durationMs -  Math.ceil(differenceDurationMs * 0.2),
            description: 'The best course ever!!!!!',
            topRated: false,
        },
    ],
    FAKE_USERS: [
        {
            id: 1,
            firstName: 'Jack',
            lastName: 'Sparrow',
            email: 'email1',
            password: '0000'
        },
        {
            id: 2,
            firstName: 'Luke',
            lastName: 'Skywalker',
            email: 'email2',
            password: '0000'
        }
    ],
    ROUTES: {
        emptyRoute: '',
        loginRoute: 'login',
        coursesRoute: 'courses',
        createNewCourseRoute: 'courses/new',
        editCourseRoute: 'courses/:id',
        redirectToLogin: '/login',
        errorRoute: '**',
    },
    COURSES_SERVER: 'http://localhost:3000/courses',
};

