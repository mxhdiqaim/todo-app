import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import NotFound from './components/pages/NotFound';
import Home from './components/pages/Home';

// Context APIs
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import TodoState from './context/todos/TodoState';

import './App.scss';

function App() {
  return (
    <AlertState>
      <AuthState>
        <TodoState>
          <Router>
            <Switch>
              <Route exact path='/' component={Home} />
            </Switch>
          </Router>
        </TodoState>
      </AuthState>
    </AlertState>
  );
}

export default App;
