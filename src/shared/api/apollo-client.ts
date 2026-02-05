import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import Cookies from 'js-cookie';

const httpLink = new HttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_URL ??
    'http://localhost:3001/api/graphql',
});

const authLink = new SetContextLink((prevContext) => {
  const token = Cookies.get('access_token');

  return {
    ...prevContext,
    headers: {
      ...prevContext.headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = new ErrorLink(({ error }) => {
  if (!error) return;

  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );

      if (extensions?.code === 'UNAUTHENTICATED') {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/login';
      }
    });
    return;
  }

  if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach(({ message, extensions }) => {
      console.error(
        `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
          extensions
        )}`
      );

      if (extensions?.code === 'UNAUTHENTICATED') {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/login';
      }
    });
    return;
  }

  console.error('[Network error]:', error);
});

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});
