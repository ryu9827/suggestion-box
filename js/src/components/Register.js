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
const Web3 = require('web3');
const contract = require("truffle-contract");
let Suggestion_abi =require('../Suggestion.json');
// let Suggestion_abi = require("./Suggestion.json");

let web3 = null;

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
        if (!window.web3) {
            window.alert('Please install MetaMask first.');
            return;
        }
        if (!web3) {
            // We don't know window.web3 version, so we use our own instance of web3
            // with provider given by window.web3
            web3 = new Web3(window.web3.currentProvider);
            // return;
        }
        if (!web3.eth.coinbase) {
            window.alert('Please activate MetaMask first.');
            return;
        }
            console.log("Inner is called");
            
            let name = window.web3.sha3(this.state.userName);
            let password = window.web3.sha3(this.state.password);
            let suggestion = contract(Suggestion_abi);

            //set provider to the contract
            suggestion.setProvider(window.web3.currentProvider);
            if (typeof suggestion.currentProvider.sendAsync !== "function") {
                suggestion.currentProvider.sendAsync = function() {
                    return suggestion.currentProvider.send.apply(
                        suggestion.currentProvider,
                        arguments
                        );
                    };
                }
            
            //set MetaMask account as default user, or you cannot call contract's function
            suggestion.web3.eth.defaultAccount = suggestion.web3.eth.coinbase;
            let contract_suggestion = suggestion.at(global.contract.Suggestion)

            await contract_suggestion.register(name, this.state.userName,password)
                .then(res=>
                    this.setState({
                        visible: true,
                        message:"Congras! You have Register!",
                        dangerMessage:false,
                    })
                )
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