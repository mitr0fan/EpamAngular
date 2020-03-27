import { CoursesActionsTypes, CoursesActions } from '../actions/courses.actions';
import { Course } from 'src/app/course';

export interface CoursesState {
    courses: Course[];
    error: {
        errorStatus: boolean;
        errorMessage: string;
    };
    amountCourses: number;
    selectedCourse: Course;
}

const initialState: CoursesState = {
    courses: [],
    error: {
        errorStatus: false,
        errorMessage: '',
    },
    amountCourses: 2,
    selectedCourse: null,
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
                amountCourses: action.payload.amount,
            };
        case CoursesActions.GetCourseDataSuccess:
            return {
                ...state,
                selectedCourse: { ...action.payload.course },
            };
        case CoursesActions.GetCourseDataError:
            return {
                ...state,
                selectedCourse: { ...action.payload.course },
                error: { ...action.payload.error },
            };
        default:
            return state;
    }
}
