import Container from 'react-bootstrap/Container';
import Calculator from './components/Calculator';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
//import './App.css';

/**
 * 
 * ==== Rebuilding this app from scratch ====
 * npx create-react-app <app-name>
 * npm install react-bootstrap bootstrap
 * npm install react-bootstrap-icons --save
 * npm install react-router-dom
 * For a subsite, add in "homepage": ".", to package.json
 */

function App() {
  return (
    <div className="App">
      <Router basename={'/impairment'}>
        <Container>
          <Switch>                                          
            <Route path="/">
              <Calculator />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
