import React, { useState, Component } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

/* Suggested Improvements:
    - Leverage a library such as Formik to handle form data
    - Lift form state up to the Assessment component in case sibling components need access to it down the road
    - Implement an interface for the form data so it can be serialized before being sent to an API
    - Abstract the mock API call to a service layer
    - Instead of returning a Bad Request response for excessive investment amounts, add a limit to form validation for better UX
    - Use form tooltips instead of input placeholders so initial values can be numbers where requried instead of strings
*/

function MarketingBanner(props) {
  return (
    <div>      
      <Jumbotron>
        <Container>        
          <h1>Pre-Qualify for Investments Online</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus, urna non aliquet congue, leo tellus placerat est, ac egestas turpis orci nec tellus.
            Nulla nisi tortor, condimentum vitae risus eget, tincidunt efficitur leo. Aenean viverra leo vitae lobortis blandit. Nullam leo felis, pharetra non justo in,
            tincidunt eleifend tortor. Nunc risus leo, consectetur vel dolor maximus, sollicitudin fringilla odio. Cras gravida blandit nibh a condimentum. Donec justo
            tellus, sollicitudin vel molestie in, mattis vel eros. Integer ultricies dolor purus, nec posuere mi commodo efficitur. Donec a dapibus quam, sit amet finibus
            leo. Nullam odio lectus, molestie at laoreet ac, fermentum in augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
            Praesent eu ultrices urna.
          </p>
        </Container>
      </Jumbotron>
    </div>
  );
}

// Controlled component for the form so React manages input state/data instead of the DOM via refs
class AssessmentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      investmentAmount: '',
      investmentType: '',
      netWorth: '',
      annualIncome: '',
      creditScore: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault(); // Prevent automatic form submission. Process data first

    this.setState({ validated: true });

    const formElement = event.target;

    if (formElement.checkValidity()) {
      // Initial values are strings. Parse any that should be ints
      // ParseInt could return NaN, add error handling for that
      const formData = {
        investmentAmount: parseInt(this.state.investmentAmount),
        investmentType: this.state.investmentType,
        netWorth: parseInt(this.state.netWorth),
        annualIncome: parseInt(this.state.annualIncome),
        creditScore: parseInt(this.state.creditScore)
      };

      assessQualifications(formData);
    } else {
      event.stopPropagation(); // Contain the event so it does't affect parent listeners when data is invalid
    }
  };

  handleChange(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    this.setState({
      [fieldName]: fieldValue
    });
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col lg="8">
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}> {/* The noValidate attribute prevents default browser validation */}
              <Form.Group as={Row} controlId="investmentAmount">
                <Form.Label column sm={3}>Investment Amount</Form.Label>
                <Col sm={7}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      name="investmentAmount"
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="Desired investment amount"
                      value={this.state.investmentAmount}
                      onChange={this.handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid dollar amount.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Col>
              </Form.Group>
  
              <Form.Group as={Row} controlId="investmentType">
                <Form.Label column sm={3}>Investment Type</Form.Label>
                <Col sm={7}>
                  <Form.Control 
                    name="investmentType"
                    type="text" 
                    placeholder="e.g. Bonds, Stocks, Real Estate"
                    value={this.state.investmentType}
                    onChange={this.handleChange}
                    required                     
                  />
                  <Form.Control.Feedback type="invalid">
                    Please describe the type of investment you're interested in.
                </Form.Control.Feedback>
                </Col>
              </Form.Group>
  
              <Form.Group as={Row} controlId="netWorth">
                <Form.Label column sm={3}>Net Worth</Form.Label>
                <Col sm={7}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text >$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      name="netWorth"
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="Total net worth"
                      value={this.state.netWorth}
                      onChange={this.handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid dollar amount.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Col>
              </Form.Group>
  
              <Form.Group as={Row} controlId="annualIncome">
                <Form.Label column sm={3}>Yearly Income</Form.Label>
                <Col sm={7}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text >$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      name="annualIncome"
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="Estimated yearly income"
                      value={this.state.annualIncome}
                      onChange={this.handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid dollar amount.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Col>
              </Form.Group>
  
              <Form.Group as={Row} controlId="creditScore">
                <Form.Label column sm={3}>Credit Score</Form.Label>
                <Col sm={7}>
                  <Form.Control
                    name="creditScore" 
                    type="number" 
                    min="300" 
                    max="850" 
                    placeholder="Estimated credit score"
                    value={this.state.creditScore} 
                    onChange={this.handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a value between 300-850.
                </Form.Control.Feedback>
                </Col>
              </Form.Group>
  
              <Form.Group as={Row} className="justify-content-md-center">
                <Col xs lg="2">
                  <Button bsPrefix="custom-btn" type="submit">Submit</Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }  
}

function assessQualifications(assessmentInfo) {
  console.log(assessmentInfo);

  /*  TODO: 
      Evaluate data and redirect according to response. Return a promise wrapped response object with message and approval flag

      1) Reject: Investment Amount is more than 1/5th of their Yearly Income and/or more than 3% of their Total Net Worth
      2) Reject: Estimated Credit is below 600
      3) Return bad request response if investment amount is above $9,000,000
      4) Otherwise, approve user
  */
};

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