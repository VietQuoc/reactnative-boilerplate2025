import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

export class ReactNativeFile {
  uri: string;
  name: string;
  type: string;
  constructor({
    uri,
    name,
    type,
  }: {
    uri: string;
    name: string;
    type: string;
  }) {
    this.uri = uri;
    this.name = name;
    this.type = type;
  }
}

const isReactNativeFile = (value: any) => value instanceof ReactNativeFile;

const uploadLink = createUploadLink({
  uri: 'http://192.168.1.10:3000/graphql',
  isExtractableFile: value =>
    isReactNativeFile(value) || value instanceof File || value instanceof Blob,
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
});
const httpLink = new HttpLink({
  uri: 'http://192.168.1.10:3000/graphql',
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
  uploadLink,
);

// Tạo Apollo Client
const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
