import React, { FC, ReactNode } from 'react';
import { combineReducers, ReducersMapObject } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';
import { PersistGate } from 'redux-persist/integration/react';
import { StateType } from 'typesafe-actions';
import createStore from './createStore';
import * as reducers from './reducers';
import ReduxProviderFactory from './_providers/ReduxProviderFactory';

/* ------------- Reducers ------------- */
const allReducers = Object.values(reducers).reduce(
    (prev: ReducersMapObject, curr: Record<string, any>): ReducersMapObject => {
        return {
            ...prev,
            ...curr.reducerMap,
        };
    },
    {},
);

const rootReducer = combineReducers(allReducers);

export type RootState = StateType<typeof rootReducer>;

const persistConfig = {
    key: 'root',
    storage: sessionStorage, //Using session storage so it removes user auth info when browser tab closes
    whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* ------------- Create Store ------------- */
const { store } = createStore(persistedReducer);

export default store;

const persistor = persistStore(store);

interface Props {
    loading?: ReactNode;
    children: ReactNode;
}

/* ------------- Create Provider ------------- */
export const ReduxProvider: FC<Props> = ({ children }) => (
    <ReduxProviderFactory store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            {children}
        </PersistGate>
    </ReduxProviderFactory>
);
