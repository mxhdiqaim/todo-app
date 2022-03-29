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
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVTbml5VHFHYmxRWldaR01ia2NhQSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImF1dGgwfDYyNDE4NTRkZWZiMmE4MDA2OTc4MmE4MSJ9LCJuaWNrbmFtZSI6Im11aGRtYWhkaWEzNiIsIm5hbWUiOiJtdWhkbWFoZGlhMzZAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzVmNzIwMmRkYTQ3MmE1OThmM2I3MDViOWFiZDBjMzY4P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGbXUucG5nIiwidXBkYXRlZF9hdCI6IjIwMjItMDMtMjhUMDk6NTI6MTQuMjY2WiIsImlzcyI6Imh0dHBzOi8vZGV2LTRqeDFpMXMxLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MjQxODU0ZGVmYjJhODAwNjk3ODJhODEiLCJhdWQiOiJRVnlKazVTR2RreUxvcm9odGRQVDdyb055enFsdHhhbCIsImlhdCI6MTY0ODQ2NDg4NywiZXhwIjoxNjQ4NDY4NDg1fQ.VXMlhwH4zalz-H2RzF_TtSAS6bZzi5KbXvQirL7cejdjDiZWI4e-LzXZMEgL7LaipTwHm4tl85vV6w2bqmdXTJ6l2kH0bwFOnCNIVrlz-HKS9XaxarPEFV0y73H5v0u5vR08hWKG6tw1kwS2T8pqHW7ZVuyBx8DP6AbJ1Cy_XfILTGLVPwxJ-QdJqC4Okuqm_kdgrIgZzl1bSq3kDyWU4azaUTd8KYxIdmTy3BYkUODyleArFliNHmknyyjm0435OETvIU904hgh4OnopIBmQMxRUR7jbh5RJ7x0giT9y9Y1xC3CDVMnRiABJMz2GF8d9nidPgF4LxaptkIJLr5q9w';
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
