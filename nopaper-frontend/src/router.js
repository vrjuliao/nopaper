import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Login from '../src/pages/Login';

const routes = [
  { path: '/login', component: Login }
]

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={() => (
          <Redirect to={{ pathname: '/login' }} />
        )} />
        <Switch>
          {
            routes.map((route, index) => (
              <InternalRoute {...route} key={index} />
            ))
          }
          <Route component={() => ('Página não encontrada!')} />
        </Switch>
      </div>
    </Router>
  );
}

function InternalRoute ({ component: Component, ...rest }) {
  return (
    <Route {...rest} 
      render={props => (
        <Component {...props} />
      )}
    />
  );
}

export default hot(module)(App);