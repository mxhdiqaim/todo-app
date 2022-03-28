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
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';

// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   // createHttpLink,
//   HttpLink,
//   // createHttpLink,
// } from '@apollo/client';

// import { setContext } from '@apollo/client/link/context';

if (localStorage.accessToken) {
  setAuthToken(localStorage.accessToken);
}

const App = () => {
  const hasuraDomain = process.env.REACT_APP_HASURA_DOMAIN;

  // const authLink = setContext((_, { headers }) => {
  //   // get the authentication token from redux store.
  //   const accessToken = localStorage.getItem('accessToken');
  //   // add the jwt token to the authorization header.
  //   return {
  //     headers: {
  //       ...headers,
  //       Authorization: accessToken ? `Bearer ${accessToken}` : '',
  //       'Access-Control-Allow-Origin': 'no-cors',
  //     },
  //   };
  // });

  const httpLink = new HttpLink({ uri: hasuraDomain });

  const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authorization token from local storage.
    const token =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVTbml5VHFHYmxRWldaR01ia2NhQSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImF1dGgwfDYyNDEwNzE3ZWZiMmE4MDA2OTc4MWI1ZSJ9LCJuaWNrbmFtZSI6Im11aHNhIiwibmFtZSI6Im11aHNhQG1qLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9iMDBjZDFlZTllODFmZDUzMmU4NDhjM2Y5ZmIyMzgxOT9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRm11LnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIyLTAzLTI4VDAwOjUzOjQ0LjUzMloiLCJpc3MiOiJodHRwczovL2Rldi00angxaTFzMS51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjI0MTA3MTdlZmIyYTgwMDY5NzgxYjVlIiwiYXVkIjoiUVZ5Sms1U0dka3lMb3JvaHRkUFQ3cm9OeXpxbHR4YWwiLCJpYXQiOjE2NDg0MzA2OTAsImV4cCI6MTY0ODQzNDI4OH0.RnxkSNBVvvvBn4YPkfPxsfgL4P_GEAUfK2GO8Z15Jijuf6zxpN5J_iN71JqxhEvlddD8Go7JcOnSindPGk3E1xljDHPrXGNdGRXNcOgy_hjctzGJJumKC6SIChXqox69mwyvijKVggf7HwXQSyWR6Ae8Y1I_oLt6Lde8QqrMRoePbFthqmiWcipcwTUSVojJbEvyk6AVC9cFNKsg_xc2SMtcUAqsjXbt_zBeseCNbQrH3lxNHzrdODpCOLZn-5_8Xehh2iFUFQUQZZ8ocTujwsD07UWRugXIx7eD3pA7N7lIlr4HV-dpyCeQKbqEmKBfT18YsF8C-nxUqshMp-6ReA';
    // const token = localStorage.getItem('accessToken');

    // Use the setContext method to set the HTTP headers.
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });

    // Call the next link in the middleware chain.
    return forward(operation);
  });

  // const httpLink = new HttpLink({
  //   uri: hasuraDomain,
  //   credentials: 'include',
  // });

  const client = new ApolloClient({
    link: authLink.concat(httpLink), // Chain it with the HttpLink
    cache: new InMemoryCache(),
  });

  // const client = new ApolloClient({
  //   cache: new InMemoryCache(),
  //   fetchOptions: {
  //     mode: 'no-cors',
  //     'Access-Control-Allow-Origin': 'no-cors',
  //   },
  //   ssrMode: true,
  //   connectToDevTools: true,
  //   link: authLink.concat(httpLink),
  // });

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
