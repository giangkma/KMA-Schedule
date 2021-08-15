import React, { FC } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { HomeScreen, LoginScreen } from 'src/view/screens';
import { PageShell } from '../components/PageShell';
import { PrivateRoute, PublicOnlyRoute } from './ControlledRoute';

export enum Screen {
    Home = '/',
    Login = '/login',
}

const Router: FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <PublicOnlyRoute path={Screen.Login}>
                    <PageShell>
                        <LoginScreen />
                    </PageShell>
                </PublicOnlyRoute>

                <PrivateRoute path={Screen.Home}>
                    <PageShell>
                        <HomeScreen />
                    </PageShell>
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
