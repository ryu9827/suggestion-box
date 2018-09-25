import React from 'react';
import { 
    Nav, 
    NavItem,  
    NavLink,   
} from 'reactstrap';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
      }
    
    render() {
      return (
        <div>
          <Nav pills>
          <NavItem>
              <NavLink href="/suggestions/unhandled"
              active={window.location.pathname === '/suggestions/unhandled'}
              >Unhandled</NavLink>
          </NavItem>
          <NavItem>
              <NavLink href="/suggestions/rejected" 
              active={window.location.pathname === '/suggestions/rejected'}
              >Rejected</NavLink>
          </NavItem>
          <NavItem>
              <NavLink href="/suggestions/completed" 
              active={window.location.pathname === '/suggestions/completed'}
              >Completed</NavLink>
          </NavItem>
          <NavItem>
              <NavLink href="/login" 
              active={window.location.pathname === '/login'}
              >Login</NavLink>
          </NavItem>
          </Nav>
      </div>
      )
    }
}
