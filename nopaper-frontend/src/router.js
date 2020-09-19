import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Login from '../src/pages/Login';
import Dashboard from '../src/pages/Dashboard';
import MarkdownEditor from '../src/pages/MarkdownEditor';


const routes = [
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/markdown-editor', component: MarkdownEditor }
]

const App = () => {
  return (
    <Router>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
          background-image: url(./background_2.jpg);
          background-size: contain
        }
      `}</style>
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