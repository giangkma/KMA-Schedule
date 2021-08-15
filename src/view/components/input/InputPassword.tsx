import React, { useCallback, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { EyeActiveIconSVG, EyeInActiveIconSVG } from 'src/assets/svg';

interface Props {
    classNameContainer?: string;
    classNameInput?: string;
    msg?: FieldError;
    placeholder?: string;
    register?: () => void;
    defaultValue?: string;
    name?: string;
}

export const InputPassword: React.FC<Props> = ({
    classNameContainer,
    classNameInput,
    msg,
    placeholder,
    register,
    defaultValue,
    name = 'initialPassword',
    ...props
}) => {
    const [isViewPass, setIsViewPass] = useState<boolean>(false);

    const onToggleViewPass = useCallback(() => {
        setIsViewPass(prev => !prev);
    }, []);

    return (
        <div
            className={`${classNameContainer}  block w-full relative font-body`}
        >
            <input
                className={`mt-1 block w-full border-none bg-gray-100 h-12 px-4 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 ${classNameInput}`}
                type={isViewPass ? 'text' : 'password'}
                placeholder={placeholder}
                ref={register}
                defaultValue={defaultValue}
                name={name}
                {...props}
            />
            {isViewPass ? (
                <button type="button" onClick={onToggleViewPass}>
                    <EyeActiveIconSVG className="absolute top-0 mt-3 right-0 w-6 h-6 mr-4" />
                </button>
            ) : (
                <button type="button" onClick={onToggleViewPass}>
                    <EyeInActiveIconSVG className="absolute top-0 mt-3 right-0 w-6 h-6 mr-4" />
                </button>
            )}
            {msg && (
                <p className="text-red-400 text-left text-base italic -mt-5 mb-3">
                    {msg.message}
                </p>
            )}
        </div>
    );
};
