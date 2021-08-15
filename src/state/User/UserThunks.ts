import container from 'src/container';
import { DataLogin, UserRole } from 'src/domain/user';
import { AppThunk } from 'src/state/common';
import { UserActions } from 'src/state/_actions';
const {
    cradle: { authService },
} = container;

const onLoginThunk = (data: DataLogin): AppThunk => async (
    dispatch,
): Promise<void> => {
    const res = await authService.login(data);
    if (res && !res.status) {
        throw new Error('Đã xảy ra lỗi');
    }
    await dispatch(
        UserActions.setUser({
            id: 1,
            username: data.username,
            role: UserRole.member,
        }),
    );
    await dispatch(UserActions.setSchedules(res.dataJson));
};

export default {
    onLoginThunk,
};
