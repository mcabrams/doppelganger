/* THIS IS A GENERATED FILE - DO NOT MODIFY */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** 
 * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
 **/
  GenericScalar: any,
};

export type AnswerType = {
   __typename?: 'AnswerType',
  text: Scalars['String'],
};

export type CreateUser = {
   __typename?: 'CreateUser',
  user?: Maybe<UserType>,
};


/** The real action happens in our custom GraphQLView  */
export type Logout = {
   __typename?: 'Logout',
  noop?: Maybe<Scalars['Boolean']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createUser?: Maybe<CreateUser>,
  /** The real action happens in our custom GraphQLView  */
  logout?: Maybe<Logout>,
  /** Obtain JSON Web Token mutation */
  tokenAuth?: Maybe<ObtainJsonWebToken>,
  verifyToken?: Maybe<Verify>,
  refreshToken?: Maybe<Refresh>,
};


export type MutationCreateUserArgs = {
  email: Scalars['String'],
  password: Scalars['String'],
  username: Scalars['String']
};


export type MutationTokenAuthArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationVerifyTokenArgs = {
  token: Scalars['String']
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String']
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'],
};

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebToken = {
   __typename?: 'ObtainJSONWebToken',
  token?: Maybe<Scalars['String']>,
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
   __typename?: 'PageInfo',
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'],
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'],
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>,
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  users?: Maybe<UserPublicConnection>,
  protectedUsers?: Maybe<UserConnection>,
  questions?: Maybe<QuestionConnection>,
};


export type QueryUsersArgs = {
  before?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryProtectedUsersArgs = {
  before?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryQuestionsArgs = {
  before?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type QuestionConnection = {
   __typename?: 'QuestionConnection',
  /** Pagination data for this connection. */
  pageInfo: PageInfo,
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<QuestionEdge>>,
};

/** A Relay edge containing a `Question` and its cursor. */
export type QuestionEdge = {
   __typename?: 'QuestionEdge',
  /** The item at the end of the edge */
  node?: Maybe<QuestionType>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

export type QuestionType = Node & {
   __typename?: 'QuestionType',
  text: Scalars['String'],
  answers: Array<AnswerType>,
  /** The ID of the object. */
  id: Scalars['ID'],
};

export type Refresh = {
   __typename?: 'Refresh',
  token?: Maybe<Scalars['String']>,
  payload?: Maybe<Scalars['GenericScalar']>,
};

export type UserConnection = {
   __typename?: 'UserConnection',
  /** Pagination data for this connection. */
  pageInfo: PageInfo,
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<UserEdge>>,
};

/** A Relay edge containing a `User` and its cursor. */
export type UserEdge = {
   __typename?: 'UserEdge',
  /** The item at the end of the edge */
  node?: Maybe<UserType>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

export type UserPublicConnection = {
   __typename?: 'UserPublicConnection',
  /** Pagination data for this connection. */
  pageInfo: PageInfo,
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<UserPublicEdge>>,
};

/** A Relay edge containing a `UserPublic` and its cursor. */
export type UserPublicEdge = {
   __typename?: 'UserPublicEdge',
  /** The item at the end of the edge */
  node?: Maybe<UserPublicType>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

export type UserPublicType = Node & {
   __typename?: 'UserPublicType',
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'],
  /** The ID of the object. */
  id: Scalars['ID'],
};

export type UserType = Node & {
   __typename?: 'UserType',
  password: Scalars['String'],
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'],
  email: Scalars['String'],
  /** The ID of the object. */
  id: Scalars['ID'],
};

export type Verify = {
   __typename?: 'Verify',
  payload?: Maybe<Scalars['GenericScalar']>,
};
export type CreateUserMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String'],
  username: Scalars['String']
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: Maybe<{ __typename?: 'CreateUser' }
    & CreateUserResponseFragment
  > }
);

export type CreateUserResponseFragment = (
  { __typename?: 'CreateUser' }
  & { user: Maybe<(
    { __typename?: 'UserType' }
    & Pick<UserType, 'email' | 'username'>
  )> }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout: Maybe<(
    { __typename?: 'Logout' }
    & Pick<Logout, 'noop'>
  )> }
);

export type QuestionsQueryVariables = {};


export type QuestionsQuery = (
  { __typename?: 'Query' }
  & { questions: Maybe<(
    { __typename?: 'QuestionConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'QuestionEdge' }
      & { node: Maybe<{ __typename?: 'QuestionType' }
        & QuestionsResponseFragment
      > }
    )>> }
  )> }
);

export type QuestionsResponseFragment = (
  { __typename?: 'QuestionType' }
  & Pick<QuestionType, 'text'>
);

export type TokenAuthMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type TokenAuthMutation = (
  { __typename?: 'Mutation' }
  & { tokenAuth: Maybe<{ __typename?: 'ObtainJSONWebToken' }
    & TokenAuthResponseFragment
  > }
);

export type TokenAuthResponseFragment = (
  { __typename?: 'ObtainJSONWebToken' }
  & Pick<ObtainJsonWebToken, 'token'>
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Maybe<(
    { __typename?: 'UserPublicConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'UserPublicEdge' }
      & { node: Maybe<{ __typename?: 'UserPublicType' }
        & UsersResponseFragment
      > }
    )>> }
  )> }
);

export type UsersResponseFragment = (
  { __typename?: 'UserPublicType' }
  & Pick<UserPublicType, 'username'>
);
export const CreateUserResponseFragmentDoc = gql`
    fragment CreateUserResponse on CreateUser {
  user {
    email
    username
  }
}
    `;
export const QuestionsResponseFragmentDoc = gql`
    fragment QuestionsResponse on QuestionType {
  text
}
    `;
export const TokenAuthResponseFragmentDoc = gql`
    fragment TokenAuthResponse on ObtainJSONWebToken {
  token
}
    `;
export const UsersResponseFragmentDoc = gql`
    fragment UsersResponse on UserPublicType {
  username
}
    `;
export const CreateUserDocument = gql`
    mutation CreateUser($email: String!, $password: String!, $username: String!) {
  createUser(email: $email, password: $password, username: $username) {
    ...CreateUserResponse
  }
}
    ${CreateUserResponseFragmentDoc}`;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

    export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
    }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    noop
  }
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

    export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
      return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
    }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const QuestionsDocument = gql`
    query Questions {
  questions {
    edges {
      node {
        ...QuestionsResponse
      }
    }
  }
}
    ${QuestionsResponseFragmentDoc}`;

    export function useQuestionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<QuestionsQuery, QuestionsQueryVariables>) {
      return ApolloReactHooks.useQuery<QuestionsQuery, QuestionsQueryVariables>(QuestionsDocument, baseOptions);
    }
      export function useQuestionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<QuestionsQuery, QuestionsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<QuestionsQuery, QuestionsQueryVariables>(QuestionsDocument, baseOptions);
      }
      
export type QuestionsQueryHookResult = ReturnType<typeof useQuestionsQuery>;
export type QuestionsQueryResult = ApolloReactCommon.QueryResult<QuestionsQuery, QuestionsQueryVariables>;
export const TokenAuthDocument = gql`
    mutation TokenAuth($email: String!, $password: String!) {
  tokenAuth(email: $email, password: $password) {
    ...TokenAuthResponse
  }
}
    ${TokenAuthResponseFragmentDoc}`;
export type TokenAuthMutationFn = ApolloReactCommon.MutationFunction<TokenAuthMutation, TokenAuthMutationVariables>;

    export function useTokenAuthMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TokenAuthMutation, TokenAuthMutationVariables>) {
      return ApolloReactHooks.useMutation<TokenAuthMutation, TokenAuthMutationVariables>(TokenAuthDocument, baseOptions);
    }
export type TokenAuthMutationHookResult = ReturnType<typeof useTokenAuthMutation>;
export type TokenAuthMutationResult = ApolloReactCommon.MutationResult<TokenAuthMutation>;
export type TokenAuthMutationOptions = ApolloReactCommon.BaseMutationOptions<TokenAuthMutation, TokenAuthMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    edges {
      node {
        ...UsersResponse
      }
    }
  }
}
    ${UsersResponseFragmentDoc}`;

    export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
      return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
    }
      export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
      
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;