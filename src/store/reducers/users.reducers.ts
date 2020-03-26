import { CurrentUser, UserError } from '../models/user.model';
import { UsersActions, LoadUserActions } from '../actions/users.actions';

export interface State {
    user: CurrentUser;
    loadUserError: UserError;
    userLoggedIn: boolean;
}

const initialState: State = {
    user: {
        id: null,
        firstName: '',
        lastName: '',
    },
    loadUserError: {
        errorStatus: false,
        errorMessage: '',
    },
    userLoggedIn: false,
};

export function usersReducer(state: State = initialState, action: LoadUserActions): State {
    switch (action.type) {
        case UsersActions.LoadUserSuccess:
            return {
                ...state,
                user: { ...action.payload.user },
            };
        case UsersActions.LoadUserError:
            return {
                ...state,
                loadUserError: action.payload.error,
                user: { ...action.payload.user },
            };
        case UsersActions.ChangeUserStatus:
            return {
                ...state,
                userLoggedIn: action.payload.loggedIn,
            };
        default:
            return state;
    }
}
