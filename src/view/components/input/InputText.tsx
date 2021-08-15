import React, { FC } from 'react';
import { FieldError } from 'react-hook-form';

interface Props {
    classNameContainer?: string;
    classNameInput?: string;
    name: string;
    placeholder?: string;
    defaultValue?: string;
    value?: string;
    msg?: FieldError;
    disabled?: boolean;
    register?: () => void;
}

export const InputText: FC<Props> = ({
    classNameContainer,
    classNameInput,
    placeholder,
    defaultValue,
    msg,
    register,
    ...props
}) => {
    return (
        <div className={`${classNameContainer} block w-full font-body`}>
            <input
                type="text"
                className={`mt-1 block w-full border-none bg-gray-100 h-12 px-4 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 ${classNameInput}`}
                placeholder={placeholder}
                ref={register}
                defaultValue={defaultValue}
                {...props}
            />
            {msg && (
                <p className="text-red-400 text-left text-base italic mt-1 mb-3">
                    {msg.message}
                </p>
            )}
        </div>
    );
};
