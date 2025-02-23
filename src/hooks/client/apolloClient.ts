import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// graphql - transport - ws;
const httpLink = new HttpLink({
  uri: 'http://192.168.1.10:3000/graphql', // Đổi thành URL backend của bạn
});

export const wsClient = createClient({
  url: 'ws://192.168.1.10:3000/graphql',
});

const wsLink = new GraphQLWsLink(wsClient);

// Tự động chọn HTTP hoặc WebSocket tùy vào request type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// Tạo Apollo Client
const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
