import * as R from 'ramda';
import { useSelector } from 'react-redux';
import { UserRedux } from 'src/state/reducers';

// hook check if user logged in
export const useAuthenticated = (): boolean => {
    const signedInUser = useSelector(
        R.pipe(UserRedux.getReducerState, UserRedux.selectors.getUser),
    );
    const schedules = useSelector(
        R.pipe(UserRedux.getReducerState, UserRedux.selectors.getUser),
    );
    return !!signedInUser && !!schedules;
};
