import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';

import { Resolvers } from '@src/generated/graphql';
// TODO: Some way to not have to repeat all these?
import { Query } from '@src/resolvers/Query';
import { Mutation } from '@src/resolvers/Mutation';
import { Link } from '@src/resolvers/Link';
import { Subscription } from '@src/resolvers/Subscription';
import { User } from '@src/resolvers/User';
import { Vote } from '@src/resolvers/Vote';
import { Context } from '@src/types';

// Provide resolver functions for your schema fields
const resolvers: Resolvers = {
  Query,
  Mutation,
  Subscription,
  Link,
  User,
  Vote,
};

const typeDefs = importSchema(`${__dirname}/schema/schema.graphql`);
export const schema = makeExecutableSchema<Context>({ typeDefs, resolvers });
