import { VoteResolvers } from '@src/generated/graphql';

export const Vote: VoteResolvers = {
  link: (parent, args, context) => context.prisma.vote({ id: parent.id }).link(),
  user: (parent, args, context) => context.prisma.vote({ id: parent.id }).user(),
};
