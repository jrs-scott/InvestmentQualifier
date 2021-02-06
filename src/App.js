import './App.css';
import {
  Route,
  NavLink,
  BrowserRouter,
  Switch
} from 'react-router-dom';
import Assessment from './Assessment';
import AccountCreation from './AccountCreation';
import Rejection from './Rejection';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';

function App() {
  // TODO: Add navbar for design purposes only and set up routing

  return (
    <BrowserRouter basename="/">
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand><img class="header-logo" src="/logo.jpg" alt="Company logo" /> ACME Investing</Navbar.Brand>
          {/* TODO: Remove nav links after development */}
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/accountcreation">Account Creation</Nav.Link>
            <Nav.Link href="/rejection">Rejection</Nav.Link>
          </Nav>
        </Navbar>
        
        <div id="main-content">
          <Switch>
            <Route path='/accountcreation'>
              <AccountCreation />
            </Route>
            <Route path='/rejection'>
              <Rejection />
            </Route>
            <Route exact path='/'>
              <Assessment />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
