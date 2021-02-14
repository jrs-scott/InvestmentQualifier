import {
  Route,
  NavLink,
  BrowserRouter,
  Switch
} from 'react-router-dom';

import Assessment from './Assessment';
import AccountCreation from './AccountCreation';
import Rejection from './Rejection';
import BadRequest from './BadRequest';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';

function App() {
  return (
    <BrowserRouter basename="/">
      <div>
        <Navbar>
          <Navbar.Brand><img className="header-logo" src="/logo.png" alt="Company logo" />ACME Investing</Navbar.Brand>
          {/* TODO: Remove nav links after development */}
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/accountcreation">Account Creation</Nav.Link>
            <Nav.Link href="/rejection">Rejection</Nav.Link>
            <Nav.Link href="/badrequest">Bad Request</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Your future starts today!
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        
        <div id="main-content">
          <Switch>
            <Route path='/accountcreation'>
              <AccountCreation />
            </Route>
            <Route path='/rejection/:message' component={Rejection}>
            </Route>
            <Route path='/badrequest'>
              <BadRequest />
            </Route>
            <Route exact path='/'>
              <Assessment />
            </Route>
            <Route path="*">
              <BadRequest />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
