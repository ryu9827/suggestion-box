import React from 'react';
import { 
    Card, 
    CardFooter, 
    CardBody,
    CardTitle, 
    CardText,
} from 'reactstrap';
import FooterButtons from './FooterButtons';
import '../global_config';

export default class SuggestionCard extends React.Component{
    constructor(props){
        super(props);
    }
    render(){        
        // console.log(this.props);
        
        return(
            <div><Card>
            {/* <CardHeader>Header <Badge pill> 5  </Badge></CardHeader> */}
            <CardBody>
            <CardTitle>{this.props.title}</CardTitle>
            <CardText>{this.props.content}</CardText>
            <CardText>Owner: {this.props.owner}  created at: {global.helpers.timeConverter(this.props.timestamp)}</CardText>
            </CardBody>
            <CardFooter>
                <FooterButtons {...this.props} />
            </CardFooter>
        </Card>
        <br/>
        </div>            
        )
    }
}