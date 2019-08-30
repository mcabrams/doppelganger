import { SubscriptionResolvers } from '@src/generated/graphql';

export const Subscription: SubscriptionResolvers = {
  newVote: {
    subscribe: (parent, args, context) => context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node(),
  },
  newLink: {
    subscribe: (parent, args, context) => context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node(),
  },
};
