import {
  Route,
  BrowserRouter,
  Switch
} from 'react-router-dom';

import Assessment from './Assessment';
import AccountCreation from './AccountCreation';
import Rejection from './Rejection';
import BadRequest from './BadRequest';

import Navbar from 'react-bootstrap/Navbar'

/* Suggested Improvements:
    - Add navigation links to nav bar
    - Provide request ID as the path param for rejections instead of 'message'
*/

function App() {
  return (
    <BrowserRouter basename="/">
      <div>
        <Navbar>
          <Navbar.Brand>
            <img className="header-logo" src="/logo.png" alt="Company logo" />
            ACME Investing
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Your future starts today!
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        
        <div id="main-content">
          <Switch>
            <Route
              path='/accountcreation'
              component={AccountCreation}
            ></Route>
            <Route
              path='/rejection/:message'
              component={Rejection}
            ></Route>
            <Route
              path='/badrequest'
              component={BadRequest}
            ></Route>
            <Route
              exact path='/'
              component={Assessment}
            ></Route>
            <Route
              path="*"
              component={BadRequest}
            ></Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
