import React from 'react';
import Navigation from './Navigation';
import { Route, BrowserRouter } from 'react-router-dom';
import Switch from 'react-router-dom/Switch';
import Unhandled from './Unhandled';
import Rejected from './Rejected';
import Completed from './Completed';
import Login from './Login';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <BrowserRouter>
          <div>
            <Navigation />
            <Switch>
              <Route path="/" component={Unhandled} />
              <Route path="/rejected" component={Rejected} />
              <Route path="/completed" component={Completed} />
              <Route path="/login" component={Login} />
            </Switch> 
          </div>
        </BrowserRouter>
    );
  }
}