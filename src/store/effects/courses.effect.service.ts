import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesService } from 'src/app/services/courses.service';
import {
    CoursesActions,
    GetCoursesSuccess,
    GetCourses,
    GetCoursesError,
    RemoveCourse,
    SearchCourses,
    ChangeAmountCourses,
    GetCourseData,
    GetCourseDataSuccess,
    GetCourseDataError,
} from '../actions/courses.actions';
import { switchMap, map, catchError, distinct, concatMap, reduce, mergeMap } from 'rxjs/operators';
import { of, zip } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CoursesEffect {
    getCourses$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoursesActions.GetCourses),
            switchMap((action: GetCourses) => {
                const data = action.payload;
                return this.coursesService.getList(data.amountCourses, data.amountPages).pipe(
                    map((courses) => new GetCoursesSuccess({ courses })),
                    catchError((error) =>
                        of(
                            new GetCoursesError({
                                error: {
                                    errorMessage: error.error,
                                    errorStatus: true,
                                },
                            })
                        )
                    )
                );
            })
        );
    });

    removeCourse$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoursesActions.RemoveCourse),
            switchMap((action: RemoveCourse) =>
                this.coursesService
                    .removeItem(action.payload.id)
                    .pipe(
                        map(() =>
                            new GetCourses({
                                amountCourses: action.payload.amountCourses,
                                amountPages: 1,
                            })
                        )
                    )
            )
        );
    });

    searchCourses$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoursesActions.SearchCourses),
            switchMap((action: SearchCourses) =>
                zip(
                    this.coursesService.searchCoursesByTitle(action.payload.value),
                    this.coursesService.searchCoursesByDescription(action.payload.value)
                ).pipe(
                    concatMap((arr) => [].concat(...arr)),
                    distinct((course) => course.id),
                    reduce((courses, course) => [...courses, course], []),
                    mergeMap((courses) => {
                        return [
                            new GetCoursesSuccess({ courses }),
                            new ChangeAmountCourses({ amount: courses.length }),
                        ];
                    })
                )
            )
        );
    });

    getCourseData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoursesActions.GetCourseData),
            switchMap((action: GetCourseData) =>
                this.coursesService.getItemById(action.payload.id).pipe(
                    map((course) => new GetCourseDataSuccess({ course: course[0] })),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            new GetCourseDataError({
                                error: {
                                    errorMessage: error.message,
                                    errorStatus: true,
                                },
                                course: null,
                            })
                        )
                    )
                )
            )
        );
    });

    constructor(private actions$: Actions, private coursesService: CoursesService) {}
}
