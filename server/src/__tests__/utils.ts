import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { HttpLink } from 'apollo-link-http';
import { execute } from 'apollo-link';

/**
 * e2e Testing Utils
 */

interface ExecuteOperationArgs {
  query: any;
  variables: any;
}

export const startTestServer = async (server: ApolloServer) => {
  const app = express();
  server.applyMiddleware({ app });
  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);
  const theServer = await httpServer.listen({ port: 4003 });

  const link = new HttpLink({
    uri: 'http://localhost:4003/graphql',
  });

  const executeOperation = ({ query, variables = {} }: ExecuteOperationArgs) => (
    execute(link, { query, variables })
  );

  return {
    link,
    stop: () => theServer.close(),
    graphql: executeOperation,
  };
};
