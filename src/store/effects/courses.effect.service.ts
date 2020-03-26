import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesService } from 'src/app/services/courses.service';
import {
    CoursesActions,
    GetCoursesSuccess,
    GetCourses,
    GetCoursesError,
} from '../actions/courses.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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

    constructor(private actions$: Actions, private coursesService: CoursesService) {}
}
