// import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// const httpLink = new HttpLink({
//   uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3001/api/graphql',
// });

// export const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });

'use client';

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_URL ||
    'http://localhost:3001/api/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.NEXT_PUBLIC_DEV_TOKEN;

  return {
    headers: {
      ...headers,
      authorization: token
        ? `Bearer ${token}`
        : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
