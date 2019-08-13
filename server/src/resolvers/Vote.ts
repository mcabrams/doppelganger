import { Vote } from '@src/generated/prisma-client';
import { Context } from '@src/types';

export const link = (parent: Vote, args: null, context: Context) => {
  return context.prisma.vote({id: parent.id}).link();
};

export const user = (parent: Vote, args: null, context: Context) => {
  return context.prisma.vote({id: parent.id}).user();
};
