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

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebToken = {
   __typename?: 'ObtainJSONWebToken',
  token?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  users?: Maybe<Array<UserPublicType>>,
  protectedUsers?: Maybe<Array<UserType>>,
  questions?: Maybe<Array<QuestionType>>,
};

export type QuestionType = {
   __typename?: 'QuestionType',
  text: Scalars['String'],
  answers: Array<AnswerType>,
};

export type Refresh = {
   __typename?: 'Refresh',
  token?: Maybe<Scalars['String']>,
  payload?: Maybe<Scalars['GenericScalar']>,
};

export type UserPublicType = {
   __typename?: 'UserPublicType',
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'],
};

export type UserType = {
   __typename?: 'UserType',
  password: Scalars['String'],
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'],
  email: Scalars['String'],
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
  & { users: Maybe<Array<{ __typename?: 'UserPublicType' }
    & UsersResponseFragment
  >> }
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
    ...UsersResponse
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