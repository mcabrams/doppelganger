import { ApolloServer } from 'apollo-server-express';

import { context } from '@src/context';
import { schema } from '@src/schema';

export const server = new ApolloServer({
  schema,
  context,
});
