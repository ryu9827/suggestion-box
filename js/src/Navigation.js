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
              <NavLink href="/unhandled"
              active
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
      </div>
      )
    }
}
