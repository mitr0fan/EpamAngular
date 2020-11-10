import { Action } from '@ngrx/store';
import { CurrentUser, Credentials, UserError } from '../models/user.model';

export enum UsersActions {
    LoadUser = '[Authorization API] LoadUser',
    LoadUserSuccess = '[Authorization API] LoadUserSuccess',
    LoadUserError = '[Authorization API] LoadUserError',
    GetUserInfoFromLocalStorage = '[LocalStorage API] GetUserInfoFromLocalStorage',
    ChangeUserStatus = '[Authorization API] ChangeUserStatus',
    UserLogOff = '[Authorization API] UserLogOff',
    ChangeLoadingStatus = 'ChangeLoadingStatus',
}

export class LoadUser implements Action {
    readonly type = UsersActions.LoadUser;

    constructor(public payload: { credentials: Credentials }) {}
}

export class LoadUserSuccess implements Action {
    readonly type = UsersActions.LoadUserSuccess;

    constructor(public payload: { user: CurrentUser }) {}
}

export class LoadUserError implements Action {
    static user: CurrentUser = {
        id: null,
        firstName: '',
        lastName: '',
    };
    readonly type = UsersActions.LoadUserError;

    constructor(public payload: { error: UserError; user: CurrentUser }) {}
}

export class GetUserInfoFromLocalStorage implements Action {
    readonly type = UsersActions.GetUserInfoFromLocalStorage;
}

export class ChangeUserStatus implements Action {
    readonly type = UsersActions.ChangeUserStatus;

    constructor(public payload: { loggedIn: boolean }) {}
}

export class UserLogOff implements Action {
    readonly type = UsersActions.UserLogOff;
}

export class ChangeLoadingStatus implements Action {
    readonly type = UsersActions.ChangeLoadingStatus;

    constructor(public payload: { status: boolean }) {}
}

export type LoadUserActions =
    | LoadUser
    | LoadUserSuccess
    | LoadUserError
    | GetUserInfoFromLocalStorage
    | ChangeUserStatus
    | ChangeLoadingStatus
    | UserLogOff;
