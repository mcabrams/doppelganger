import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { App } from '@src/components/App';
import { env } from '@src/lib/env';

const wsLink = new WebSocketLink({
  uri: env('API_WS_SERVER_URL'),
  options: {
    reconnect: true,
  },
});

const httpLink = createHttpLink({
  uri: env('API_SERVER_URL'),
});

const link = split(
  ({ query }) => {
    // @ts-ignore TODO: types don't seem to be accurate here?
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
