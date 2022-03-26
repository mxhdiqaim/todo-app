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

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

if (localStorage.accessToken) {
  setAuthToken(localStorage.accessToken);
}

const App = () => {
  const httpLink = createHttpLink({
    uri: '/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const accessToken = localStorage.accessToken;

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    };
  });

  // console.log(httpLink);

  // const client = new ApolloClient({
  //   uri: 'https://hasura-todo-api.hasura.app/v1/graphql',
  //   cache: new InMemoryCache(),
  // });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
};

export default App;
