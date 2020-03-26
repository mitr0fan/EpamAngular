import { Action } from '@ngrx/store';
import { Course } from 'src/app/course';

export enum CoursesActions {
    GetCourses = '[Courses Page] GetCourses',
    GetCoursesSuccess = '[HTTP API] GetCoursesSuccess',
    GetCoursesError = '[HTTP API] GetCoursesError',
    GetCourseData = '[HTTP API] GetCourseData',
}

export class GetCourses implements Action {
    readonly type = CoursesActions.GetCourses;

    constructor(public payload: { amountCourses: number; amountPages: number }) {}
}

export class GetCoursesSuccess implements Action {
    readonly type = CoursesActions.GetCoursesSuccess;

    constructor(public payload: { courses: Course[] }) {}
}

export class GetCoursesError implements Action {
    readonly type = CoursesActions.GetCoursesError;

    constructor(public payload: { error: { errorMessage: string; errorStatus: boolean } }) {}
}

export class GetCourseData implements Action {
    readonly type = CoursesActions.GetCourseData;

    constructor(public payload: { course: Course }) {}
}

export type CoursesActionsTypes = GetCourses | GetCourseData | GetCoursesSuccess | GetCoursesError;
