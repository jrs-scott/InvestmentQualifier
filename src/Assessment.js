import React from 'react';

function MarketingBanner(props) {
  // TODO: Build marketing banner

  return (
    <div>
      Marketing placeholder.
    </div>
  );
}

function AssessmentForm(props) {
  // TODO: Build form with validation

  return (
    <div>
      Assessment form placeholder.
    </div>
  );
}

// TODO: Mock API call to return approval/rejection on form submission

class Assessment extends React.Component {
  render() {
    return (
      <div>
        <MarketingBanner />
        <AssessmentForm />
      </div>      
    );
  }
}

export default Assessment;