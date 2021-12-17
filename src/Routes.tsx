import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const Nav = loadable(() => import('./components/Nav'));
const NavTab = loadable(() => import('./pages/NavTab/NavTab'));
const Category = loadable(() => import('./pages/Category/Category'));
const ListDetail = loadable(() => import('./pages/ListDetail/ListDetail'));
const Login = loadable(() => import('./pages/Login/Login'));
const MyPage = loadable(() => import('./pages/MyPage/MyPage'));
const Register = loadable(() => import('./pages/Register/Register'));
const Search = loadable(() => import('./pages/Search/Search'));
const Writing = loadable(() => import('./pages/Writing/Writing'));
const EditInformation = loadable(
  () => import('./pages/EditInformation/EditInformation'),
);
const FindPassword = loadable(
  () => import('./pages/FindPassword/FindPassword'),
);
const Introduction = loadable(
  () => import('./pages/Introduction/Introduction'),
);
const PageNotFound = loadable(
  () => import('./pages/PageNotFound/PageNotFound'),
);

const Routes = () => {
  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={NavTab} />
          <Route path="/Category" component={Category} />
          <Route path="/EditInformation" component={EditInformation} />
          <Route path="/FindPassword" component={FindPassword} />
          <Route path="/ListDetail" component={ListDetail} />
          <Route path="/MyPage" component={MyPage} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="/Search" component={Search} />
          <Route path="/Writing" component={Writing} />
          <Route path="/Introduction" component={Introduction} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
