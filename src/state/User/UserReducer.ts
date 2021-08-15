import { produce } from 'immer';
import { User } from 'src/domain/user';
import { createReducer, getType } from 'typesafe-actions';
import { UserActions } from '../_actions';
import { UserState } from './types';

const stateKey = 'user';

/* ------------- Initial State ------------- */
const INITIAL_STATE: UserState = {
    information: undefined,
    schedules: undefined,
};

/* ------------- Reducers ------------- */
const setUser = (
    state: UserState,
    { payload: { user } }: ReturnType<typeof UserActions.setUser>,
): UserState =>
    produce(state, draft => {
        draft.information = user;
    });

const setSchedules = (
    state: UserState,
    { payload: { data } }: ReturnType<typeof UserActions.setSchedules>,
): UserState =>
    produce(state, draft => {
        draft.schedules = data;
    });

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
    [getType(UserActions.setUser)]: setUser,
    [getType(UserActions.setSchedules)]: setSchedules,
});

const reducerMap = { [stateKey]: reducer };

/* ------------- Selectors ------------- */
// use any for root state for now because of Dependency cycle error
// TODO: resolve dependency cycle error
// eslint-disable-next-line
const getReducerState = (state: any): UserState => state[stateKey];

const selectors = {
    getUser: (state: UserState): User | undefined => state.information,
    getSchedules: (state: UserState): any => state.schedules,
};

/* ------------- Export ------------- */
export default {
    // default export
    selectors,

    INITIAL_STATE,

    stateKey,
    getReducerState,
    reducer,
    reducerMap,
};
