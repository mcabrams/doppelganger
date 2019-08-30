import { ApolloServerExpressConfig } from 'apollo-server-express';

import { prisma } from '@src/generated/prisma-client';

export const context: ApolloServerExpressConfig['context'] = request => ({
  ...request,
  prisma,
});
