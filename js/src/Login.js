import React, { Component } from 'react';
import { 
    Col,
    Row,
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input, 
    FormText, 
    Badge,
    Alert,
} from 'reactstrap';
import "./global_config";
const Web3 = require('web3');
const contract = require("truffle-contract");
// const MetaMaskConnector = require('node-metamask');
let Person_abi =require('./Person.json');
// let Suggestion_abi = require("./Suggestion.json");


// let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
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
        };
    };

    componentWillMount(){
        if(window.web3.eth.coinbase){
            this.setState({isMetaMaskAccess:true})
        }
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
            return;
        }
        if (!web3.eth.coinbase) {
            window.alert('Please activate MetaMask first.');
            return;
        }
            console.log("Inner is called");
            
            let name = window.web3.sha3(this.state.userName);
            let password = window.web3.sha3(this.state.password);
            let person = contract(Person_abi);

            //set provider to the contract
            person.setProvider(window.web3.currentProvider);
            if (typeof person.currentProvider.sendAsync !== "function") {
                person.currentProvider.sendAsync = function() {
                    return person.currentProvider.send.apply(
                        person.currentProvider,
                        arguments
                        );
                    };
                }
            
            //set MetaMask account as default user, or you cannot call contract's function
            person.web3.eth.defaultAccount = person.web3.eth.coinbase;
            let contract_person = person.at(global.contract.Person)

            await contract_person.register(name, this.state.userName,password)
                .then(res=>
                    this.setState({
                        message:"Congras! You have been registered!",
                        dangerMessage:false,
                    })
                )
                .catch(err=>
                    this.setState({
                        message:"Sorry, register fails. Does your username already exist? Try login",
                        dangerMessage:true,
                    })
                )   
    }

    // handleLogin=()=>{
        // console.log(state.userName);
        // event.preventDefault();
    // }

    render(){
        const alertMessage = <Alert color={this.state.dangerMessage? "danger":"success"}>{this.state.message}</Alert>;
        
        return(
            <div>
            <p>MetaMask connection status:&nbsp; 
                <Badge 
                    color={window.web3.eth.coinbase? "success":"secondary"} 
                    // onClick={this.handleClick}
                    > {window.web3.eth.coinbase? "Connected!": "Not connected"} 
                </Badge>
            </p>
            {this.state.message && alertMessage}
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
                    // type="submit"
                    onClick={this.handleRegister} 
                    >Register</Button>
                <Col sm={1}></Col>
                {/* <p>{window.web3.eth.coinbase}</p> */}
            </Row>
            </Form>
            </div>
        );
    }

}