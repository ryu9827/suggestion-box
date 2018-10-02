import React, { Component } from 'react';
import { 
    Col,
    Row,
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input, 
    Badge,
    Alert,
} from 'reactstrap';
import "../global_config";
import { Route, Link } from 'react-router-dom';
import Login from './Login';

var contractInstance = require("../web3connector/ContractInstance")
var MetaMask = require("../web3connector/MetaMask")

export default class Register extends Component{
    constructor(props){
        super(props);
        this.state ={
            userName:"",
            password:"",
            isManager:false,
            isAdmin:false,
            isMetaMaskAccess:window.web3.eth.coinbase,
            message:"",
            dangerMessage:false,
            visible: false,
        };
        this.onDismiss = this.onDismiss.bind(this);
    };

    componentWillMount(){
        if(window.web3.eth.coinbase){
            this.setState({isMetaMaskAccess:true})
        }
    }

    onDismiss() {
        this.setState({ visible: false });
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

    handleRegister = async ()=>{
        let web3 = MetaMask.web3Checker(window.web3); 

            console.log("Inner is called");
            
            let name = window.web3.sha3(this.state.userName);
            let password = window.web3.sha3(this.state.password);
            let contract_suggestion = contractInstance.contractProvider();

            await contract_suggestion.register(name, this.state.userName,password)
                .then(res=>{
                    this.setState({
                        visible: true,
                        message:"Congras! You have Register!",
                        dangerMessage:false,
                    });
                    sessionStorage.userName = this.state.userName;
                })
                .catch(err=>
                    this.setState({
                        visible: true,
                        message:`Sorry, Register fails. Try login?`,
                        dangerMessage:true,
                    })
                )   
    }

    render(){
        const alertMessage = <Alert color={this.state.dangerMessage? "danger":"success" } isOpen={this.state.visible} toggle={this.onDismiss}>{this.state.message}</Alert>;
        
        return(
            <div>
                <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Registration</h1>
                </header>
            </div>
            <p>MetaMask connection status:&nbsp; 
                <Badge 
                    color={window.web3.eth.coinbase? "success":"secondary"} 
                    > {window.web3.eth.coinbase? "Connected!": "Not connected"} 
                </Badge>
            </p>
            {this.state.visible && alertMessage}
            <br />
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
                    onClick={this.handleRegister} 
                    >Register</Button>
                <Col sm={1}></Col>
            </Row>
            <Row> Already have an account? <Link to="/login"> Try login</Link>.</Row>
            </Form>
            <Route path="/login" component={Login} />
            </div>
        );
    }

}