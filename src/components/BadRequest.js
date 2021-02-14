import React from 'react';
import { withRouter } from 'react-router';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

/* Suggested Improvements:
    - Don't use inline styling, create a new class instead
    - Provide a more professional message :)
*/
class BadRequest extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Alert variant="danger" style={{ 'margin-top': '2rem' }}>
        <Alert.Heading className="text-center">
          Oh snap, the hamster fell asleep at the wheel!
        </Alert.Heading>
        <p>
          We tried our best to complete your request, but something got lost along the way.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button bsPrefix="custom-btn" onClick={() => this.props.history.push("/")}>
            Return Home
          </Button>
        </div>
    </Alert>
    );
  }
}

export default withRouter(BadRequest);