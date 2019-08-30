import { UserResolvers } from '@src/generated/graphql';

export const User: UserResolvers = {
  links: (parent, args, context) => context.prisma.user({ id: parent.id }).links(),
};
