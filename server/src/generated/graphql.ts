/* THIS IS A GENERATED FILE - DO NOT MODIFY */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Link, User, Vote } from './prisma-client';
import { Context } from '../types';
export type Maybe<T> = T | undefined | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
};

export type AuthPayload = {
  __typename?: 'AuthPayload',
  token?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
};


export type Feed = {
  __typename?: 'Feed',
  links: Array<Link>,
  count: Scalars['Int'],
};

export type Link = {
  __typename?: 'Link',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  description: Scalars['String'],
  url: Scalars['String'],
  postedBy?: Maybe<User>,
  votes: Array<Vote>,
};

export enum LinkOrderByInput {
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC'
}

export type Mutation = {
  __typename?: 'Mutation',
  post: Link,
  updateLink?: Maybe<Link>,
  deleteLink?: Maybe<Link>,
  signup?: Maybe<AuthPayload>,
  login?: Maybe<AuthPayload>,
  vote?: Maybe<Vote>,
};


export type MutationPostArgs = {
  url: Scalars['String'],
  description: Scalars['String']
};


export type MutationUpdateLinkArgs = {
  id: Scalars['ID'],
  url?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>
};


export type MutationDeleteLinkArgs = {
  id: Scalars['ID']
};


export type MutationSignupArgs = {
  email: Scalars['String'],
  password: Scalars['String'],
  name: Scalars['String']
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationVoteArgs = {
  linkId: Scalars['ID']
};

export type Query = {
  __typename?: 'Query',
  feed: Feed,
  link?: Maybe<Link>,
};


export type QueryFeedArgs = {
  filter?: Maybe<Scalars['String']>,
  skip?: Maybe<Scalars['Int']>,
  first?: Maybe<Scalars['Int']>,
  orderBy?: Maybe<LinkOrderByInput>
};


export type QueryLinkArgs = {
  id: Scalars['ID']
};

export type Subscription = {
  __typename?: 'Subscription',
  newLink?: Maybe<Link>,
  newVote?: Maybe<Vote>,
};

export type User = {
  __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  email: Scalars['String'],
  links: Array<Link>,
};

export type Vote = {
  __typename?: 'Vote',
  id: Scalars['ID'],
  link: Link,
  user: User,
};
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  LinkOrderByInput: LinkOrderByInput,
  Feed: ResolverTypeWrapper<Omit<Feed, 'links'> & { links: Array<ResolversTypes['Link']> }>,
  Link: ResolverTypeWrapper<Link>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  User: ResolverTypeWrapper<User>,
  Vote: ResolverTypeWrapper<Vote>,
  Mutation: ResolverTypeWrapper<{}>,
  AuthPayload: ResolverTypeWrapper<Omit<AuthPayload, 'user'> & { user?: Maybe<ResolversTypes['User']> }>,
  Subscription: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  String: Scalars['String'],
  Int: Scalars['Int'],
  LinkOrderByInput: LinkOrderByInput,
  Feed: Omit<Feed, 'links'> & { links: Array<ResolversTypes['Link']> },
  Link: Link,
  ID: Scalars['ID'],
  DateTime: Scalars['DateTime'],
  User: User,
  Vote: Vote,
  Mutation: {},
  AuthPayload: Omit<AuthPayload, 'user'> & { user?: Maybe<ResolversTypes['User']> },
  Subscription: {},
  Boolean: Scalars['Boolean'],
}>;

export type AuthPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = ResolversObject<{
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type FeedResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Feed'] = ResolversParentTypes['Feed']> = ResolversObject<{
  links?: Resolver<Array<ResolversTypes['Link']>, ParentType, ContextType>,
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
}>;

export type LinkResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Link'] = ResolversParentTypes['Link']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  postedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  votes?: Resolver<Array<ResolversTypes['Vote']>, ParentType, ContextType>,
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  post?: Resolver<ResolversTypes['Link'], ParentType, ContextType, MutationPostArgs>,
  updateLink?: Resolver<Maybe<ResolversTypes['Link']>, ParentType, ContextType, MutationUpdateLinkArgs>,
  deleteLink?: Resolver<Maybe<ResolversTypes['Link']>, ParentType, ContextType, MutationDeleteLinkArgs>,
  signup?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, MutationSignupArgs>,
  login?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, MutationLoginArgs>,
  vote?: Resolver<Maybe<ResolversTypes['Vote']>, ParentType, ContextType, MutationVoteArgs>,
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  feed?: Resolver<ResolversTypes['Feed'], ParentType, ContextType, QueryFeedArgs>,
  link?: Resolver<Maybe<ResolversTypes['Link']>, ParentType, ContextType, QueryLinkArgs>,
}>;

export type SubscriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  newLink?: SubscriptionResolver<Maybe<ResolversTypes['Link']>, ParentType, ContextType>,
  newVote?: SubscriptionResolver<Maybe<ResolversTypes['Vote']>, ParentType, ContextType>,
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  links?: Resolver<Array<ResolversTypes['Link']>, ParentType, ContextType>,
}>;

export type VoteResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Vote'] = ResolversParentTypes['Vote']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  link?: Resolver<ResolversTypes['Link'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  AuthPayload?: AuthPayloadResolvers<ContextType>,
  DateTime?: GraphQLScalarType,
  Feed?: FeedResolvers<ContextType>,
  Link?: LinkResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  Vote?: VoteResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
