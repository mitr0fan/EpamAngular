import { State } from '..';
import { createSelector } from '@ngrx/store';
import * as Users from '../reducers/users.reducers';

const selectUsers = (state: State) => state.userState;

export const selectCurrentUser = createSelector(selectUsers, (state: Users.State) => state.user);

export const selectUserStatus = createSelector(
    selectUsers,
    (state: Users.State) => state.userLoggedIn
);
