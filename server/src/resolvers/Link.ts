import { Link } from '@src/generated/prisma-client';
import { Context } from '@src/types';

export const postedBy = (parent: Link, args: null, context: Context) => {
  return context.prisma.link({ id: parent.id }).postedBy();
};

export const votes = (parent: Link, args: null, context: Context) => {
  return context.prisma.link({ id: parent.id }).votes();
};
