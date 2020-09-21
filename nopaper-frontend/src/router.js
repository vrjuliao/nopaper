import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Login from '../src/pages/Login';
import Dashboard from '../src/pages/Dashboard';
import MarkdownEditor from '../src/pages/MarkdownEditor';
import Notes from '../src/pages/Notes';
import Preview from '../src/pages/Preview';

const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/markdown-editor', component: MarkdownEditor },
  { path: '/notes', component: Notes },
  { path: '/preview', component: Preview }
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
          <Route path="/login" component={Login}/>
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
  const token = sessionStorage.getItem('token');
  return (
    <Route {...rest} 
      render={props => {
        if (token != null && token.length > 0) {
          return (
            <Component {...props} />
          );
        } else {
          return (
            <Redirect to={{
              pathname: '/login'
            }}
            />
          );
        }
        
      }}
    />
  );
}

export default hot(module)(App);