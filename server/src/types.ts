import { Prisma } from './generated/prisma-client';
import { Request } from 'express';

export type Context = {
  prisma: Prisma;
  req: Request;
}
