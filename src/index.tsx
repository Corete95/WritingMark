import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { DataProvider } from "context/DataContext";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";
import LoadUser from "components/LoadUser";

LoadUser();

ReactDOM.render(
  <>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  </>,
  document.getElementById("root"),
);
