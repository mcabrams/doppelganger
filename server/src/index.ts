import http from 'http';
import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';

import { Resolvers } from '@src/generated/graphql';
import { prisma } from '@src/generated/prisma-client';
// TODO: Some way to not have to repeat all these?
import { Query } from '@src/resolvers/Query';
import { Mutation } from '@src/resolvers/Mutation';
import { Link } from '@src/resolvers/Link';
import { Subscription } from '@src/resolvers/Subscription';
import { User } from '@src/resolvers/User';
import { Vote } from '@src/resolvers/Vote';
import { Context } from '@src/types';

const typeDefs = importSchema(__dirname + '/schema/schema.graphql');

// Provide resolver functions for your schema fields
const resolvers: Resolvers = {
  Query,
  Mutation,
  Subscription,
  Link,
  User,
  Vote,
};

const schema = makeExecutableSchema<Context>({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  context: request => {
    return {
      ...request,
      prisma,
    };
  },
});

const app = express();
server.applyMiddleware({ app });
app.use(compression());

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);
httpServer.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at path ${server.graphqlPath}`)
);
