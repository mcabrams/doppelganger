import { User } from '@src/generated/prisma-client';
import { Context } from '@src/types';

export const links = (parent: User, args: null, context: Context) => {
  return context.prisma.user({ id: parent.id }).links();
};
