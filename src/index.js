import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import 'semantic-ui-css/semantic.min.css';

const Root = () => (
  <Router>
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();