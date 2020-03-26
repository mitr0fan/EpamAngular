import { CoursesActionsTypes, CoursesActions } from '../actions/courses.actions';
import { Course } from 'src/app/course';

export interface CoursesState {
    courses: Course[];
    error: {
        errorStatus: boolean;
        errorMessage: string;
    };
}

const initialState: CoursesState = {
    courses: [],
    error: {
        errorStatus: false,
        errorMessage: '',
    },
};

export function coursesReducer(
    state: CoursesState = initialState,
    action: CoursesActionsTypes
): CoursesState {
    switch (action.type) {
        case CoursesActions.GetCoursesSuccess:
            return {
                ...state,
                courses: [...action.payload.courses],
            };
        case CoursesActions.GetCoursesError:
            return {
                ...state,
                error: { ...action.payload.error },
            };
        default:
            return state;
    }
}
