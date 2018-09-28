import React from 'react';
import { 
    Card, 
    CardFooter, 
    CardBody,
    CardTitle, 
    CardText,
} from 'reactstrap';
import FooterButtons from './FooterButtons';

export default class SuggestionCard extends React.Component{
    constructor(props){
        super(props);
    }
    render(){        
        // let userRole = ;
        return(
            <Card>
                {/* <CardHeader>Header <Badge pill> 5  </Badge></CardHeader> */}
                <CardBody>
                <CardTitle>Title message</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <CardText>Owner: {this.props.owner}  issued at: {this.props.timestamp}</CardText>
                </CardBody>
                <CardFooter>
                    <FooterButtons {...this.props} />
                </CardFooter>
            </Card>
        )
    }
}