import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";
import LoadUser from "components/LoadUser";
import { HelmetProvider } from "react-helmet-async";

LoadUser();

ReactDOM.render(
  <>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <HelmetProvider>
          <Routes />
        </HelmetProvider>
      </ConnectedRouter>
    </Provider>
  </>,
  document.getElementById("root"),
);
