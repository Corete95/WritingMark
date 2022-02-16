import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import loadable from "@loadable/component";
import { GlobalStyle } from "./styles/global-style";
import theme from "./styles/theme";
import { ThemeProvider } from "./styles/themed-components";
import Analytics from "components/Analytics/Analytics";

const Nav = loadable(() => import("./components/Nav/Nav"));
const NavTab = loadable(() => import("./pages/NavTab/NavTab"));
const Category = loadable(() => import("./pages/Category/Category"));
const ListDetail = loadable(() => import("./pages/ListDetail/ListDetail"));
const ListDetailEdit = loadable(
  () => import("./pages/ListDetailEdit/ListDetailEdit"),
);
const Login = loadable(() => import("./pages/Login/Login"));
const MyPage = loadable(() => import("./pages/MyPage/MyPage"));
const Register = loadable(() => import("./pages/Register/Register"));
const Search = loadable(() => import("./pages/Search/Search"));
const Writing = loadable(() => import("./pages/Writing/Writing"));
const EditInformation = loadable(
  () => import("./pages/EditInformation/EditInformation"),
);
const FindPassword = loadable(
  () => import("./pages/FindPassword/FindPassword"),
);
const Introduction = loadable(
  () => import("./pages/Introduction/Introduction"),
);
const PageNotFound = loadable(
  () => import("./pages/PageNotFound/PageNotFound"),
);

const Routes = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Analytics />
          <Nav />
          <Switch>
            <Route exact path="/" component={NavTab} />
            <Route exact path="/hot" component={NavTab} />
            <Route path="/Category/:path" component={Category} />
            <Route path="/EditInformation" component={EditInformation} />
            <Route path="/FindPassword" component={FindPassword} />
            <Route path="/ListDetail/:id" component={ListDetail} />
            <Route path="/ListDetailEdit/:id/" component={ListDetailEdit} />
            <Route path="/MyPage" component={MyPage} />
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={Register} />
            <Route path="/Search" component={Search} />
            <Route path="/Writing" component={Writing} />
            <Route path="/Introduction" component={Introduction} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default Routes;
