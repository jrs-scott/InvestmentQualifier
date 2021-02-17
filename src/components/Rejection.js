import React from 'react';
import Card from 'react-bootstrap/Card';
import { withRouter } from 'react-router';
import { rejectionMsg } from '../constants';

/* Suggested Improvements:
    - Put the contact information into a separate component for greater flexibility
    - Set a different default message for rejections
    - Get rejection message from API call instead of path params
*/

function RejectionCard(props) {
  return (
    <div>
      <Card border="info">
        <Card.Body>
          <Card.Title className="text-center">Unable to Approve Request</Card.Title>
            <p data-testid="rejection-message" className="text-center">
              { props.rejectionMsg ?? rejectionMsg }
            </p> 
            <hr />
            If you have questions, please reach out to our customer service department.
            <br />
            <br />
            <b>Phone:</b> 800-456-7890
            <br />
            <b>Email:</b> customer.care@acmeinvesting.com
        </Card.Body>
      </Card>
    </div>
  );
}

function Rejection(props) {
    return (
      <div>
        <RejectionCard rejectionMsg={props.match.params.message} />
      </div>      
    );
}

export default withRouter(Rejection);