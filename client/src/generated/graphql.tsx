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
 * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
 **/
  DateTime: any,
  /** 
 * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
 **/
  GenericScalar: any,
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
  getUserList?: Maybe<Array<UserType>>,
};

export type Refresh = {
   __typename?: 'Refresh',
  token?: Maybe<Scalars['String']>,
  payload?: Maybe<Scalars['GenericScalar']>,
};

export type UserType = {
   __typename?: 'UserType',
  id: Scalars['ID'],
  password: Scalars['String'],
  lastLogin?: Maybe<Scalars['DateTime']>,
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars['Boolean'],
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars['Boolean'],
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean'],
  dateJoined: Scalars['DateTime'],
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

export type GetUserListQueryVariables = {};


export type GetUserListQuery = (
  { __typename?: 'Query' }
  & { getUserList: Maybe<Array<{ __typename?: 'UserType' }
    & GetUserListResponseFragment
  >> }
);

export type GetUserListResponseFragment = (
  { __typename?: 'UserType' }
  & Pick<UserType, 'email' | 'username'>
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
export const CreateUserResponseFragmentDoc = gql`
    fragment CreateUserResponse on CreateUser {
  user {
    email
    username
  }
}
    `;
export const GetUserListResponseFragmentDoc = gql`
    fragment GetUserListResponse on UserType {
  email
  username
}
    `;
export const TokenAuthResponseFragmentDoc = gql`
    fragment TokenAuthResponse on ObtainJSONWebToken {
  token
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
export const GetUserListDocument = gql`
    query GetUserList {
  getUserList {
    ...GetUserListResponse
  }
}
    ${GetUserListResponseFragmentDoc}`;

    export function useGetUserListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserListQuery, GetUserListQueryVariables>) {
      return ApolloReactHooks.useQuery<GetUserListQuery, GetUserListQueryVariables>(GetUserListDocument, baseOptions);
    }
      export function useGetUserListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserListQuery, GetUserListQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<GetUserListQuery, GetUserListQueryVariables>(GetUserListDocument, baseOptions);
      }
      
export type GetUserListQueryHookResult = ReturnType<typeof useGetUserListQuery>;
export type GetUserListQueryResult = ApolloReactCommon.QueryResult<GetUserListQuery, GetUserListQueryVariables>;
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