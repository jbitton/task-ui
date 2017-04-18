import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './components/App';
import { Home } from './components/Home';
import './assets/index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route exact path="/" render={(props) => {
        return ( <Home page="login" {...props}/> );
      }}/>
      <Route exact path="/signup" render={(props) => {
        return ( <Home page="signup" {...props}/> );
      }}/>
      <Route exact path="/:view/:userId" render={(props) => {
        return ( <App view={props.match.params.view} userId={props.match.params.userId} {...props}/> );
      }}/>
    </Switch>
  </HashRouter>
), document.getElementById('root'));