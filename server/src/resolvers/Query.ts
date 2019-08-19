import { QueryResolvers } from '@src/generated/graphql';

const feed: QueryResolvers['feed'] = async (root, args, context) => {
  const where = args.filter ? {
    OR: [
      {description_contains: args.filter},
      {url_contains: args.filter},
    ],
  } : {};
  // @ts-ignore TODO: remove once https://github.com/prisma/prisma/issues/3774 is fixed
  const links = await context.prisma.links({where, first: args.first, skip: args.skip, orderBy: args.orderBy});

  const count = await context.prisma
      .linksConnection({
        where,
      })
      .aggregate()
      .count();

  return {
    links,
    count,
  };
}

const link: QueryResolvers['link'] = async (parent, args, context) => {
  const link = await context.prisma.link({
    id: args.id,
  });

  if (!link) {
    throw new Error(`Link with id ${args.id} does not exist`);
  }

  return link;
};

export const Query: QueryResolvers = {
  feed,
  link,
};
