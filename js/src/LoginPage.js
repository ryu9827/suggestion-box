import React, { Component } from 'react';
import { 
    Col,
    Row,
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input, 
    FormText 
} from 'reactstrap';
import "./global_config";
const web3 = require('web3');

export default class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state ={
            userName:"",
            password:"",
            isManager:false,
            isAdmin:false,
        };
    }

    handleUsernameChange=(event)=>{
        this.setState({
            userName: event.target.value,
        })
        console.log(event.target.value)
    }

    handlePasswordChange=(event)=>{
        this.setState({
            password:event.target.value,
        })
        console.log(event.target.value);
    }

    handleRegister=()=>{
        let name = web3.sha3("Bruce");
        let password = web3.sha3(this.state.password);
        console.log(name)
        // global.contract.Person.regester(name,this.state.userName,password);
    }

    // handleLogin=()=>{
        // console.log(state.userName);
        // event.preventDefault();
    // }

    render(){

        
        return(
            <div>
            <Form>
                <FormGroup row>
                    <Col sm={3}></Col>
                    <Label for="exampleEmail" sm={1} align="right">Username</Label>
                    <Col sm={4}>
                        <Input name="username" id="username" placeholder="It has to be unique" 
                        onChange={this.handleUsernameChange}/>
                    </Col>
                    <Col sm={5}></Col>
                </FormGroup>
                <Row>
                    <Col sm={4}></Col>
                    <Col sm={4}>
                        <p type="text"  align="left">
                            * You will need this user name to login in future. So bear it in mind.
                        </p>
                        <br />
                    </Col>
                    <Col sm={4}></Col>
                </Row>
                <FormGroup row>
                    <Col sm={3}></Col>
                    <Label for="exampleEmail" sm={1} align="right">Password</Label>
                    <Col sm={4}>
                        <Input type="password" name="password" id="password" placeholder="No limitations" 
                        onChange={this.handlePasswordChange} />
                    </Col>
                    <Col sm={5}></Col>
                </FormGroup>
            <br />
            <Row>
                <Col sm={5}></Col>
                <Button 
                    color="primary" 
                    // type="submit"
                    onClick={this.handleRegister} 
                    >Register</Button>
                <Col sm={1}></Col>
                {/* <Button color="success" onSubmit={this.handleLogin}>Login</Button> */}
            </Row>
            </Form>
            </div>
        );
    }

}