import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const hasuraDomain = process.env.REACT_APP_HASURA_DOMAIN;

const client = new ApolloClient({
  uri: hasuraDomain,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
