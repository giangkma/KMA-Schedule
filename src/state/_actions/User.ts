import { User } from 'src/domain/user';
import { createAction } from 'typesafe-actions';
import { createActionTypePrefixFormat } from '../common';

const typePrefixFormat = createActionTypePrefixFormat('User');

/* ------------- action creators ------------- */
export const setUser = createAction(
    typePrefixFormat('SET_USER'),
    (user?: User) => ({
        user,
    }),
)();

export const setSchedules = createAction(
    typePrefixFormat('SET_SCHEDULES'),
    (data?: any) => ({
        data,
    }),
)();

export type UserActions =
    | ReturnType<typeof setUser>
    | ReturnType<typeof setSchedules>;
