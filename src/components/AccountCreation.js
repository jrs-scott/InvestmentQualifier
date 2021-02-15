import React from 'react';

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
    - Leverage a library such as Formik to handle form data and do custom validations
    - Redirect to account dashboard on submit instead of only displaying a success message
*/

class AccountCreation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      username: '',
      password: '',
      passwordConfirm: '',
      showSuccess: false
    }

    // Bind 'this' to instance of class
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault(); // Prevent automatic form submission. Process data first

    const form = event.target;

    this.setState({ validated: true });

    if (form.checkValidity()) {
      // Mock form submission, update UI to show a success banner instead of the form
      this.setState({ showSuccess: true });
    }        
  };

  handleChange(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    // Keep state updated with changing form values
    this.setState({
      [fieldName]: fieldValue
    });
  }

  render() {
    if (this.state.showSuccess) {
      return (
        <Alert show={this.state.showSuccess} variant="info" style={{ 'marginTop': '2rem'}}>
          <Alert.Heading className="text-center">
            Account Created!
          </Alert.Heading>
          <p>
            Thank you. An account has been created for {this.state.username}.
          </p>
        </Alert>
      );
    }

    return (
      <Container style={{ 'marginTop': '2rem'}}>
        <Jumbotron>
          <Container className="text-center">        
            <h1>Account Creation</h1>
            <p>
              Congratulations! You have been pre-approved for your investment. Please use the form below to create an account.
            </p>
          </Container>
        </Jumbotron>

        <Row className="justify-content-md-center">
          <Col lg="8">
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="username">
                <Form.Label column sm={3}>Username</Form.Label>
                <Col sm={7}>
                  <Form.Control 
                    name="username"
                    type="email" 
                    placeholder="Enter your email address"
                    value={this.state.username}
                    onChange={this.handleChange}
                    required                     
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="password">
                <Form.Label column sm={3}>Password</Form.Label>
                <Col sm={7}>
                  <Form.Control 
                    name="password"
                    type="password" 
                    minLength="9"
                    placeholder="Create a secure password"
                    pattern="(?=.+[A-Za-z])(?=.+[#?!@$%^&*\d]).{9,}"
                    title="Minimum requirement of 9 characters and must include a number or symbol #?!@$%^&*"
                    autoComplete="off"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required                     
                  />
                  <Form.Control.Feedback type="invalid">
                    Must contain at least 9 characters and either a number or a special character.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              
              <Form.Group as={Row} controlId="passwordConfirm">
                <Form.Label column sm={3}>Confirm Password</Form.Label>
                <Col sm={7}>
                  <Form.Control 
                    name="passwordConfirm"
                    type="password"
                    placeholder="Re-enter your password"
                    pattern={this.state.password}
                    title="Minimum requirement of 9 characters and must include a number or symbol #?!@$%^&*"
                    autoComplete="off"
                    value={this.state.passwordConfirm}
                    onChange={this.handleChange}
                    isInvalid={this.state.password !== this.state.passwordConfirm}
                    required                     
                  />
                  <Form.Control.Feedback type="invalid">
                    Password confirmation must match.
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

export default AccountCreation;