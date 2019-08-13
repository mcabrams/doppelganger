import { Context } from '@src/types';

const newLinkSubscribe = (parent: null, args: null, context: Context) => {
  return context.prisma.$subscribe.link({ mutation_in: ['CREATED']}).node();
};

export const newLink = {
  subscribe: newLinkSubscribe,
  // @ts-ignore TODO: type this
  resolve: payload => payload,
};

const newVoteSubscribe = (parent: null, args: null, context: Context) => {
  return context.prisma.$subscribe.vote({ mutation_in: ['CREATED']}).node();
};

export const newVote = {
  subscribe: newVoteSubscribe,
  // @ts-ignore TODO: type this
  resolve: payload => payload,
};
