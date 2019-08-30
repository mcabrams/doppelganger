import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { MutationResolvers } from '@src/generated/graphql';
import { APP_SECRET, getUserId } from '@src/utils';

export const Mutation: MutationResolvers = {
  signup: async (parent, args, context) => {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.createUser({
      ...args,
      password,
    });
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user,
    };
  },
  login: async (parent, args, context) => {
    const user = await context.prisma.user({ email: args.email });

    if (!user) {
      throw new Error('No such user found');
    }

    const valid = await bcrypt.compare(args.password, user.password);

    if (!valid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user,
    };
  },
  post: (parent, args, context) => {
    const userId = getUserId(context);

    return context.prisma.createLink({
      ...args,
      postedBy: {
        connect: {
          id: userId,
        },
      },
    });
  },
  updateLink: (parent, args, context) => {
    getUserId(context);
    const { id, ...updatedLinkArgs } = args;

    return context.prisma.updateLink({
      data: updatedLinkArgs,
      where: {
        id,
      },
    });
  },
  vote: async (parent, args, context) => {
    const userId = getUserId(context);

    const voteExists = await context.prisma.$exists.vote({
      user: {
        id: userId,
      },
      link: {
        id: args.linkId,
      },
    });

    if (voteExists) {
      throw new Error(`Already voted for link: ${args.linkId}`);
    }

    return context.prisma.createVote({
      user: {
        connect: {
          id: userId,
        },
      },
      link: {
        connect: {
          id: args.linkId,
        },
      },
    });
  },
  deleteLink: async (parent, args, context) => {
    const deleted = await context.prisma.deleteLink({
      id: args.id,
    });
    return deleted;
  },
};
