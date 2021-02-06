import React from 'react';

function RejectionReason(props) {
  // TODO: Show rejection message from mock API call
  
  return (
    <div>
      Reject message placeholder.
    </div>
  );
}

function ContactInfo(props) {
  return (
    <div>
      Placeholder for fake company contact information.
    </div>
  );
}

class Rejection extends React.Component {
  render() {
    return (
      <div>
        <RejectionReason />
        <ContactInfo />
      </div>      
    );
  }
}

export default Rejection;