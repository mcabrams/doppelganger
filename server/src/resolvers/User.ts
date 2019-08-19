import { UserResolvers } from '@src/generated/graphql';

export const User: UserResolvers = {
  links: (parent, args, context) => {
    return context.prisma.user({ id: parent.id }).links();
  },
};
