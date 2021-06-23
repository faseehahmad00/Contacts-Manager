import './App.css';
import LoginScreen from './screens/LoginScreen'
import AppScreen from './screens/appscreen'
import AddContact from './screens/addContact'
import EditContact from './screens/EditContact'
import ProfileScreen from './screens/ProfileScreen';

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
          <Route exact path="/app/addContact">
            <AddContact />
          </Route>
          <Route exact path="/app/editContact">
            <EditContact />
          </Route>
          <Route exact path="/app/profile">
            <ProfileScreen />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
