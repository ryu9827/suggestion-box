import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { 
    Router,
    Route,
    browserHistory, 
    IndexRoute,
} from 'react-router';
import Login from './Login';
import Register from './Register';
import { Container } from 'reactstrap';
import Suggestions from './Suggestions';
import Unhandled from './Unhandled';
import Rejected from './Rejected';
import Completed from './Completed';

ReactDOM.render((
    <Container>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Suggestions} />
                <Route path="/suggestion" component={Unhandled}>
                    <Route path="/suggestion/:status" component={Rejected}  />
                    <Route path="/suggestion/:status" component={Completed} />
                </Route>
                <Route path="/login" component={Login}>
                    <Route path="/login/register" component={Register} />
                </Route>
            </Route>
        </Router>
    </Container>
), document.getElementById('root'));
registerServiceWorker();
