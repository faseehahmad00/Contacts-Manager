import './App.css';
import LoginScreen from './screens/LoginScreen'
import AppScreen from './screens/appscreen'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
          <Router>
        <Switch>
          <Route exact path="/">
            <LoginScreen />
          </Route>
          <Route exact path="/app">
            <AppScreen />
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
