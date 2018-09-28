import React from 'react';
import SuggestionCard from './SuggestionCard';

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
            <SuggestionCard 
                status={this.props.match.params.status}
                owner="11" 
                timestamp="14:22:22 9 Sep, 2018" />
            </div>
        )
    }
}
