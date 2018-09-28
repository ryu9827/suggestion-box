import React from 'react';
import {Container} from 'reactstrap';
import { 
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import ERROR from './components/ERROR';
import Suggestions from './components/Suggestions';
import Suggestion  from './components/Suggestion';
import Register    from './components/Register';
import Profile     from './components/Profile';

export default class App extends React.Component {
  render() {
    return (
          <div>
            <Container>
            <Navigation />
            <Switch>
              <Route path="/suggestions/:status" component={Suggestions} />
              <Route path="/suggestions/:id" component={Suggestion} />
              <Route path="/login" component={Login} /> 
              <Route path="/register" component={Register} /> 
              <Route path="/profile" component={Profile} /> 
              <Route component={ERROR} />
              <Redirect from="/" to="/suggestions/unhandled" /> 
            </Switch> 
            </Container>
          </div>
    );
  }
}