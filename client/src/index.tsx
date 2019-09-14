import React from 'react';
import ReactDOM from 'react-dom';
import { Cookies } from 'react-cookie';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { App } from '@src/components/App';
import { IsLoggedInProvider } from '@src/hooks/useIsLoggedIn';
import { env } from '@src/lib/env';

const httpLink = createHttpLink({
  uri: env('API_SERVER_URL'),
  credentials: 'include',
});

const headerLink = setContext((_, { headers }) => {
  const cookies = new Cookies();
  const csrftoken = cookies.get('csrftoken');
  return {
    headers: {
      ...headers,
      'X-CSRFToken': csrftoken,
    },
  };
});

const client = new ApolloClient({
  link: headerLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedInProvider>
      <App />
    </IsLoggedInProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);
