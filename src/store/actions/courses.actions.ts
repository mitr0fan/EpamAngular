import { Action } from '@ngrx/store';
import { Course } from 'src/app/course';

export enum CoursesActions {
    GetCourses = '[Courses Page] GetCourses',
    GetCoursesSuccess = '[HTTP API] GetCoursesSuccess',
    GetCoursesError = '[HTTP API] GetCoursesError',
    GetCourseData = '[HTTP API] GetCourseData',
    GetCourseDataSuccess = '[HTTP API] GetCourseDataSuccess',
    GetCourseDataError = '[HTTP API] GetCourseDataError',
    RemoveCourse = '[HTTP API] RemoveCourse',
    ChangeAmountCourses = '[Courses Page] ChangeAmountCourses',
    SearchCourses = '[HTTP API] SearchCourses',
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

    constructor(public payload: { id: number }) {}
}

export class GetCourseDataSuccess implements Action {
    readonly type = CoursesActions.GetCourseDataSuccess;

    constructor(public payload: { course: Course }) {}
}

export class GetCourseDataError implements Action {
    readonly type = CoursesActions.GetCourseDataError;

    constructor(
        public payload: {
            course: Course;
            error: { errorMessage: string; errorStatus: boolean };
        }
    ) {}
}

export class RemoveCourse implements Action {
    readonly type = CoursesActions.RemoveCourse;

    constructor(public payload: { id: number; amountCourses: number }) {}
}

export class ChangeAmountCourses implements Action {
    readonly type = CoursesActions.ChangeAmountCourses;

    constructor(public payload: { amount: number }) {}
}

export class SearchCourses implements Action {
    readonly type = CoursesActions.SearchCourses;

    constructor(public payload: { value: string }) {}
}

export type CoursesActionsTypes =
    | GetCourses
    | GetCourseData
    | GetCourseDataSuccess
    | GetCourseDataError
    | GetCoursesSuccess
    | GetCoursesError
    | RemoveCourse
    | ChangeAmountCourses
    | SearchCourses;
