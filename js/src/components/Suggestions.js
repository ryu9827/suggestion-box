import React from 'react';

export default class Suggestions extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <div>Suggestions</div>
                <div>{this.props.match.params.status}</div>
            </div>
        )
    }
}
