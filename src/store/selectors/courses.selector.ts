import { State } from '..';
import { createSelector } from '@ngrx/store';
import * as Courses from '../reducers/courses.reducers';

const selectCourses = (state: State) => state.coursesState;

export const selectCoursesState = createSelector(
    selectCourses,
    (state: Courses.CoursesState) => state.courses
);

export const selectAmountCourses = createSelector(
    selectCourses,
    (state: Courses.CoursesState) => state.amountCourses
);
