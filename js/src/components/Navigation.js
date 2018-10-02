import React from 'react';
import { 
    Nav, 
    NavItem,  
    NavLink,   
} from 'reactstrap';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            userName: sessionStorage.getItem("userName"),
            userRole: sessionStorage.getItem("userRole"),
        }
      }
    
    render() {

      return (
        <div>
            <br/>
            <Nav pills>
                <NavItem>
                    <NavLink href="/suggestions/unhandled"
                    active={window.location.pathname === '/suggestions/unhandled'}
                    >Unhandled</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/suggestions/undergoing"
                    active={window.location.pathname === '/suggestions/undergoing'}
                    >Undergoing</NavLink>
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
                {sessionStorage.getItem("userName") &&
                <NavItem>
                    <NavLink href="/profile" 
                    active={window.location.pathname === '/profile'}
                    >{this.state.userRole + " "+this.state.userName}</NavLink>
                </NavItem>
                }
            </Nav>
            <hr/>
            <br/>
      </div>
      )
    }
}
