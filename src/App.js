import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Home from './components/pages/Home';
import Auth from './components/pages/Auth';

// import PrivateRoute from './components/routing/PrivateRoute';

// Context APIs
import AlertState from './context/alert/AlertState';
import TodoState from './context/todos/TodoState';

import './App.scss';

// TOKEN
import setAuthToken from './utils/setAuthToken';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // createHttpLink,
  HttpLink,
  // createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

if (localStorage.accessToken) {
  setAuthToken(localStorage.accessToken);
}

const App = () => {
  const hasuraDomain = process.env.REACT_APP_AUTH0_AUDIENCE;

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from redux store.
    const accessToken = localStorage.getItem('accessToken');
    // add the jwt token to the authorization header.
    return {
      headers: {
        ...headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
        'Access-Control-Allow-Origin': 'no-cors',
      },
    };
  });
  const httpLink = new HttpLink({
    uri: hasuraDomain,
    credentials: 'include',
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    fetchOptions: {
      mode: 'no-cors',
      'Access-Control-Allow-Origin': 'no-cors',
    },
    ssrMode: true,
    connectToDevTools: true,
    link: authLink.concat(httpLink),
  });

  return (
    <ApolloProvider client={client}>
      <AlertState>
        <TodoState>
          <Router>
            <Switch>
              <Route exact path='/auth' component={Auth} />
              <Route exact path='/' component={Home} />
              <Route path='*' component={NotFound} />
            </Switch>
          </Router>
        </TodoState>
      </AlertState>
    </ApolloProvider>
  );
};

export default App;
