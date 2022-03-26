import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Home from './components/pages/Home';
import Auth from './components/pages/Auth';

import PrivateRoute from './components/routing/PrivateRoute';

// Context APIs
import AlertState from './context/alert/AlertState';
import TodoState from './context/todos/TodoState';

import './App.scss';

// TOKEN
import setAuthToken from './utils/setAuthToken';

if (localStorage.accessToken) {
  setAuthToken(localStorage.accessToken);
}

function App() {
  return (
    <AlertState>
      <TodoState>
        <Router>
          <Switch>
            <Route exact path='/auth' component={Auth} />
            <PrivateRoute exact path='/' component={Home} />
            <Route path='*' component={NotFound} />
          </Switch>
        </Router>
      </TodoState>
    </AlertState>
  );
}

export default App;
