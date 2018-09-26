import React from 'react';

export default class Suggestions extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let userName = sessionStorage.getItem("userName");
        let userRole = sessionStorage.getItem("userRole");
        let displayUserName = <div>Current login user name: {userName}</div>
        return (
            <div>
                <div>Suggestions</div>
                {userName && displayUserName}
                <div>{this.props.match.params.status}</div>
            </div>
        )
    }
}
