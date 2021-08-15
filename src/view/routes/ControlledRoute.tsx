/* @flow */
import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuthenticated } from 'src/view/hooks';

interface Props extends RouteProps {
    redirectUrl?: string;
}

export const PrivateRoute: FC<Props> = ({
    children,
    redirectUrl = '/login',
    ...props
}) => {
    const isAuthenticated = useAuthenticated();

    return (
        <Route {...props}>
            {isAuthenticated ? children : <Redirect to={redirectUrl} />}
        </Route>
    );
};

export const PublicOnlyRoute: FC<Props> = ({
    children,
    redirectUrl = '/',
    ...props
}) => {
    const isAuthenticated = useAuthenticated();

    return (
        <Route {...props}>
            {!isAuthenticated ? children : <Redirect to={redirectUrl} />}
        </Route>
    );
};
