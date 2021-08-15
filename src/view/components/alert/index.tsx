import React, { FC } from 'react';
import { CloseIconSVG, TickGreenIconSVG, WarningIconSVG } from 'src/assets/svg';

type Props = {
    isSuccess: boolean;
    message: string | undefined;
    clearMessage?: () => void;
};

export const Alert: FC<Props> = ({ isSuccess, message, clearMessage }) => {
    return (
        <>
            {message && (
                <div
                    className={`rounded-full z-50 my-4 border-2 bg-opacity-25 px-3 py-2 flex justify-between items-center pr-3 ${
                        isSuccess
                            ? 'border-brightGreen bg-green-900'
                            : 'border-alizarinRed bg-red-800'
                    }`}
                    role="alert"
                >
                    <div className="flex items-center justify-start">
                        {isSuccess ? <TickGreenIconSVG /> : <WarningIconSVG />}
                        <div className="block sm:inline ml-2 text-white">
                            <span>{message}</span>
                        </div>
                    </div>
                    <button
                        className="focus:outline-none"
                        type="button"
                        onClick={clearMessage}
                    >
                        <CloseIconSVG className="w-5 h-5 text-white" />
                    </button>
                </div>
            )}
        </>
    );
};
