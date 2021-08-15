import React, { FC } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import { ReduxProvider } from 'src/state';
import Router from './routes/Router';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    height: 100%;

    #root {
      height: 100%;
    }
  }
  /* width */
  ::-webkit-scrollbar {
    width: 2px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #95afc0; 
    border-radius: 10px;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #535c68;
    border-radius: 10px;
  }
`;

const Application: FC = () => {
    return (
        <ThemeProvider theme={{}}>
            <GlobalStyle />
            <ReduxProvider>
                <Router />
            </ReduxProvider>
        </ThemeProvider>
    );
};

export default Application;
