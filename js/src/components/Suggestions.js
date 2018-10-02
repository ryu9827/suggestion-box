import React from 'react';
import SuggestionCard from './SuggestionCard';
import { contractProvider, suggestionArray } from '../web3connector/ContractInstance';

export default class Suggestions extends React.Component{
    constructor(props){
        super(props);
        this.state={
            suggestionArray:[],
        }
    }

    componentWillMount(){
        let contract = contractProvider();
        let status = this.props.match.params.status;
        console.log("run that");
        
        suggestionArray(contract, status)
            .then(res => {
                // console.log("this is run")
                // console.log(typeof res)
                // let arr = this.state.suggestionArray.concat();
                // arr.push(res)
                this.setState({suggestionArray:res})
        })  
        
              
    }

    render(){
        console.log(this.state.suggestionArray);
        let list = this.state.suggestionArray.map((element,i) => {
            return <SuggestionCard 
            key={i}
            owner={element[0]} 
            status={element[1]} 
            last_comment_time={element[2]}
            title={element[3]}
            content={element[4]}
            timestamp={element[5]}
            operator={element[6]} />            
        })
        
        return (
            <div>{list}</div>
        )
    }
}
