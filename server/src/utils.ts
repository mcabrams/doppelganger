import jwt from 'jsonwebtoken';

import { Context } from './types';

export const APP_SECRET = 'prisma-baby!';

export const getUserId = (context: Context) => {
  const Authorization = context.req.get('Authorization');

  if (!Authorization) {
    throw new Error('Not authenticated');
  }

  const token = Authorization.replace('Bearer ', '');
  const { userId } = jwt.verify(token, APP_SECRET) as { userId: string;};
  return userId;
};
