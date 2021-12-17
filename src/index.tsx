import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from './styles/global-style';
import theme from './styles/theme';
import { ThemeProvider } from './styles/themed-components';
import Routes from './Routes';

ReactDOM.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </>,
  document.getElementById('root'),
);
