import * as Users from './reducers/users.reducers';
import * as Courses from './reducers/courses.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
    userState: Users.State;
    coursesState: Courses.CoursesState;
}

export const reducers: ActionReducerMap<State> = {
    userState: Users.usersReducer,
    coursesState: Courses.coursesReducer,
};
