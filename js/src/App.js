import React from 'react';
import { 
    Nav, 
    NavItem,  
    NavLink,   
} from 'reactstrap';
import Suggestions from './Suggestions';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Nav pills>
          <NavItem>
            <NavLink href="/suggestions"
            // active={window.location === '/suggestions'}
            // active={true}
            activeStyle={{active:true}}
            >Unhandled</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/rejected" 
            active={window.location === 'rejected'}
            >Rejected</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/completed" 
            active={window.location === 'completed'}
            >Completed</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/login" 
            active={window.location === '/login'}
            >Login</NavLink>
          </NavItem>
        </Nav>
        {this.props.children || <Suggestions />}
      </div>
    );
  }
}