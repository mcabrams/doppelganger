import { LinkResolvers } from '@src/generated/graphql';

export const Link: LinkResolvers = {
  postedBy: (parent, args, context) => context.prisma.link({ id: parent.id }).postedBy(),
  votes: (parent, args, context) => context.prisma.link({ id: parent.id }).votes(),
};
