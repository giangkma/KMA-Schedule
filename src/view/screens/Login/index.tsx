import React, { FC, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DataLogin } from 'src/domain/user';
import { UserAuthInfo } from 'src/domain/user/schema';
import { classValidatorFormResolverFactory } from 'src/helper/form';
import { showToatify } from 'src/helper/toat';
import { UserThunks } from 'src/state/thunks';
import { Alert } from 'src/view/components/alert';
import { InputPassword } from 'src/view/components/input/InputPassword';
import { InputText } from 'src/view/components/input/InputText';
import { Spinner } from 'src/view/components/loading/Spinner';
import { useMessageData } from 'src/view/hooks';
import { useIsMountedRef } from 'src/view/hooks/useIsMountedRef';
import { Screen } from 'src/view/routes/Router';

const userAuthInfoValidatorResolver = classValidatorFormResolverFactory<
    UserAuthInfo
>(UserAuthInfo);

const Login: FC = () => {
    const { register, handleSubmit, errors } = useForm<UserAuthInfo>({
        resolver: userAuthInfoValidatorResolver,
    });

    const dispatch = useDispatch();
    const history = useHistory();
    const mountedRef = useIsMountedRef();

    const { isSuccess, message, setMessage, clearMessage } = useMessageData();

    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = async (data: DataLogin): Promise<void> => {
        try {
            setLoading(true);
            await dispatch(UserThunks.onLoginThunk(data));
            showToatify('success', 'Chào mừng bạn !');
            history.push(Screen.Home);
        } catch (error) {
            setMessage({ message: error.message });
        } finally {
            if (!mountedRef.current) {
                return;
            }
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col px-6 justify-center items-center  bg-solitudeBlue">
            <Spinner loading={loading} />

            <div className="relative sm:max-w-sm w-full">
                <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                <div className="relative w-full rounded-3xl  px-6 py-4 bg-solitudeBlue shadow-md">
                    <label className="block mt-4 text-xl text-gray-700 text-center font-semibold">
                        KMA Schedule
                    </label>
                    <Alert
                        isSuccess={isSuccess}
                        message={message}
                        clearMessage={clearMessage}
                    />
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
                        <div>
                            <InputText
                                msg={errors.username}
                                register={register}
                                name="username"
                                placeholder="Account"
                            />
                        </div>

                        <div className="mt-8">
                            <InputPassword
                                msg={errors.password}
                                register={register}
                                name="password"
                                placeholder="Password"
                            />
                        </div>
                        <div className="mb-12 mt-6">
                            <button
                                type="submit"
                                className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
