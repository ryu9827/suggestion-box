import React from 'react';
import { 
    Button, 
    Col,
    Row,
} from 'reactstrap';

export default class SuggestionCard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isManager: sessionStorage.getItem("userRole") === "manager",
            isAdmin: sessionStorage.getItem("userRole") === "admin",
            isOwner: sessionStorage.getItem("userName") === this.props.owner,
        }
    }

    render(){
        let acceptButton = <Col>
                                <Button color="primary" outline>  Accept   </Button>
                            </Col>
        let completeButton = <Col>
                                <Button color="success"   outline>  Complete </Button>
                            </Col>
        let rejectButton =<Col>
                                <Button color="warning"  outline>  Reject   </Button>
                            </Col>
        let ownerButtons  =  <Col>
                            <Button color="danger"  outline>  Delete   </Button>
                        </Col>
        console.log(this.props.status);
        

        return (
        <Row>
            {this.props.status != "undergoing" && acceptButton}
            {this.props.status != "completed" && completeButton}
            {this.props.status != "rejected" && rejectButton}            
            {this.state.isOwner && ownerButtons}
        </Row>
   )}
}