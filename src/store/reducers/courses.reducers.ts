import { CoursesActionsTypes, CoursesActions } from '../actions/courses.actions';
import { Course } from 'src/app/course';

export interface CoursesState {
    courses: Course[];
    error: {
        errorStatus: boolean;
        errorMessage: string;
    };
    amountCourses: number;
}

const initialState: CoursesState = {
    courses: [],
    error: {
        errorStatus: false,
        errorMessage: '',
    },
    amountCourses: 2,
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
        case CoursesActions.ChangeAmountCourses:
            return {
                ...state,
                amountCourses: action.payload.amount
            };
        default:
            return state;
    }
}
