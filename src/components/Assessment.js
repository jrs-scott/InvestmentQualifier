import React from 'react';
import { withRouter } from 'react-router';

import { assessQualifications } from '../data-service.js';

import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

/* Suggested Improvements:
    - Leverage a library such as Formik to handle form data
    - Lift form state up to the Assessment component to increase accessability
    - Implement an interface for the form data so it can be serialized before being sent to an API
    - Instead of returning a Bad Request response for excessive investment amounts, add a limit to form validation for better UX
    - Use form tooltips instead of input placeholders so initial values can be numbers where requried instead of strings
    - Customize error messages instead of using a generic one
    - Add actual logging from errors instead of printing them to the console
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

// Use a controlled component for the form so React manages input state/data instead of the DOM via refs
class AssessmentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      validated: false,
      investmentAmount: '',
      investmentType: '',
      netWorth: '',
      annualIncome: '',
      creditScore: ''
    }

    // Bind 'this' to instance of class
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  redirectUser(results) {
    let route;

    if (results.qualified) {
      route = "/accountcreation";
    } else if (results.error) {
      route = "/badrequest";
    } else {
      route = { pathname: `/rejection/${results.message}` };
    }

    this.props.routerHistory.push(route);
  }

  async handleSubmit(event) {
    event.preventDefault(); // Prevent automatic form submission. Process data first

    this.setState({ validated: true });

    const form = event.target;

    if (form.checkValidity()) {
      const formData = {
        // If a value can't be parsed, default it to zero
        investmentAmount: parseInt(this.state.investmentAmount) ?? 0,
        investmentType: this.state.investmentType,
        netWorth: parseInt(this.state.netWorth) ?? 0,
        annualIncome: parseInt(this.state.annualIncome) ?? 0,
        creditScore: parseInt(this.state.creditScore) ?? 0
      };

      await assessQualifications(formData).then(
        (results) => {
          this.redirectUser(results);
        }, (rejectReason) => {
          console.log(rejectReason); // If the call fails, log the message
        }).catch((errMsg) => {
          console.log(errMsg);
          this.state.error = true; // Display error page if need be
        }); 
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
    if (this.state.error) {
      return (
        <Alert show={this.state.error} variant="danger">
          <Alert.Heading className="text-center">
            Oops, slight problem...
          </Alert.Heading>
          <p>
            An error occurred while trying to submit your form.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button bsPrefix="custom-btn" onClick={() => this.setState({ error: false })}>
            Try Again
            </Button>
          </div>
        </Alert>
      );
    }

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

// Destructure router history to use for navigation
function Assessment({history, ...props}) {
  return (
    <div>
      <MarketingBanner />
      <AssessmentForm routerHistory={history} />
    </div>
  );
}

export default withRouter(Assessment);