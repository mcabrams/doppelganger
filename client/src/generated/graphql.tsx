/* THIS IS A GENERATED FILE - DO NOT MODIFY */
import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  token?: Maybe<Scalars["String"]>;
  user?: Maybe<User>;
};

export type Feed = {
  __typename?: "Feed";
  links: Array<Link>;
  count: Scalars["Int"];
};

export type Link = {
  __typename?: "Link";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  description: Scalars["String"];
  url: Scalars["String"];
  postedBy?: Maybe<User>;
  votes: Array<Vote>;
};

export enum LinkOrderByInput {
  DescriptionAsc = "description_ASC",
  DescriptionDesc = "description_DESC",
  UrlAsc = "url_ASC",
  UrlDesc = "url_DESC",
  CreatedAtAsc = "createdAt_ASC",
  CreatedAtDesc = "createdAt_DESC"
}

export type Mutation = {
  __typename?: "Mutation";
  post: Link;
  updateLink?: Maybe<Link>;
  deleteLink?: Maybe<Link>;
  signup?: Maybe<AuthPayload>;
  login?: Maybe<AuthPayload>;
  vote?: Maybe<Vote>;
};

export type MutationPostArgs = {
  url: Scalars["String"];
  description: Scalars["String"];
};

export type MutationUpdateLinkArgs = {
  id: Scalars["ID"];
  url?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
};

export type MutationDeleteLinkArgs = {
  id: Scalars["ID"];
};

export type MutationSignupArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  name: Scalars["String"];
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationVoteArgs = {
  linkId: Scalars["ID"];
};

export type Query = {
  __typename?: "Query";
  feed: Feed;
  link?: Maybe<Link>;
};

export type QueryFeedArgs = {
  filter?: Maybe<Scalars["String"]>;
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<LinkOrderByInput>;
};

export type QueryLinkArgs = {
  id: Scalars["ID"];
};

export type Subscription = {
  __typename?: "Subscription";
  newLink?: Maybe<Link>;
  newVote?: Maybe<Vote>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  email: Scalars["String"];
  links: Array<Link>;
};

export type Vote = {
  __typename?: "Vote";
  id: Scalars["ID"];
  link: Link;
  user: User;
};
export type FeedSearchQueryVariables = {
  filter: Scalars["String"];
};

export type FeedSearchQuery = { __typename?: "Query" } & {
  feed: { __typename?: "Feed" } & {
    links: Array<{ __typename?: "Link" } & LinkInfoFragment>;
  };
};

export type LinkInfoFragment = { __typename?: "Link" } & Pick<
  Link,
  "id" | "url" | "description" | "createdAt"
> & {
    postedBy: Maybe<{ __typename?: "User" } & Pick<User, "id" | "name">>;
    votes: Array<
      { __typename?: "Vote" } & Pick<Vote, "id"> & {
          user: { __typename?: "User" } & Pick<User, "id">;
        }
    >;
  };

export type LinkListQueryVariables = {
  first?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<LinkOrderByInput>;
};

export type LinkListQuery = { __typename?: "Query" } & {
  feed: { __typename?: "Feed" } & Pick<Feed, "count"> & {
      links: Array<{ __typename?: "Link" } & LinkInfoFragment>;
    };
};

export type LoginMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: Maybe<{ __typename?: "AuthPayload" } & LoginResponseFragment>;
};

export type LoginResponseFragment = { __typename?: "AuthPayload" } & Pick<
  AuthPayload,
  "token"
>;

export type PostMutationVariables = {
  description: Scalars["String"];
  url: Scalars["String"];
};

export type PostMutation = { __typename?: "Mutation" } & {
  post: { __typename?: "Link" } & LinkInfoFragment;
};

export type SignupMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
  name: Scalars["String"];
};

export type SignupMutation = { __typename?: "Mutation" } & {
  signup: Maybe<{ __typename?: "AuthPayload" } & SignupResponseFragment>;
};

export type SignupResponseFragment = { __typename?: "AuthPayload" } & Pick<
  AuthPayload,
  "token"
>;

export type VoteMutationVariables = {
  linkId: Scalars["ID"];
};

export type VoteMutation = { __typename?: "Mutation" } & {
  vote: Maybe<{ __typename?: "Vote" } & VoteResponseFragment>;
};

export type VoteResponseFragment = { __typename?: "Vote" } & Pick<
  Vote,
  "id"
> & {
    link: { __typename?: "Link" } & {
      votes: Array<
        { __typename?: "Vote" } & Pick<Vote, "id"> & {
            user: { __typename?: "User" } & Pick<User, "id">;
          }
      >;
    };
    user: { __typename?: "User" } & Pick<User, "id">;
  };
export const LinkInfoFragmentDoc = gql`
  fragment LinkInfo on Link {
    id
    url
    description
    createdAt
    postedBy {
      id
      name
    }
    votes {
      id
      user {
        id
      }
    }
  }
`;
export const LoginResponseFragmentDoc = gql`
  fragment LoginResponse on AuthPayload {
    token
  }
`;
export const SignupResponseFragmentDoc = gql`
  fragment SignupResponse on AuthPayload {
    token
  }
`;
export const VoteResponseFragmentDoc = gql`
  fragment VoteResponse on Vote {
    id
    link {
      votes {
        id
        user {
          id
        }
      }
    }
    user {
      id
    }
  }
`;
export const FeedSearchDocument = gql`
  query FeedSearch($filter: String!) {
    feed(filter: $filter) {
      links {
        ...LinkInfo
      }
    }
  }
  ${LinkInfoFragmentDoc}
`;

export function useFeedSearchQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FeedSearchQuery,
    FeedSearchQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<FeedSearchQuery, FeedSearchQueryVariables>(
    FeedSearchDocument,
    baseOptions
  );
}
export type FeedSearchQueryHookResult = ReturnType<typeof useFeedSearchQuery>;
export type FeedSearchQueryResult = ApolloReactCommon.QueryResult<
  FeedSearchQuery,
  FeedSearchQueryVariables
>;
export const LinkListDocument = gql`
  query LinkList($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(first: $first, skip: $skip, orderBy: $orderBy) {
      links {
        ...LinkInfo
      }
      count
    }
  }
  ${LinkInfoFragmentDoc}
`;

export function useLinkListQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    LinkListQuery,
    LinkListQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<LinkListQuery, LinkListQueryVariables>(
    LinkListDocument,
    baseOptions
  );
}
export type LinkListQueryHookResult = ReturnType<typeof useLinkListQuery>;
export type LinkListQueryResult = ApolloReactCommon.QueryResult<
  LinkListQuery,
  LinkListQueryVariables
>;
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...LoginResponse
    }
  }
  ${LoginResponseFragmentDoc}
`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const PostDocument = gql`
  mutation Post($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      ...LinkInfo
    }
  }
  ${LinkInfoFragmentDoc}
`;
export type PostMutationFn = ApolloReactCommon.MutationFunction<
  PostMutation,
  PostMutationVariables
>;

export function usePostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostMutation,
    PostMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<PostMutation, PostMutationVariables>(
    PostDocument,
    baseOptions
  );
}
export type PostMutationHookResult = ReturnType<typeof usePostMutation>;
export type PostMutationResult = ApolloReactCommon.MutationResult<PostMutation>;
export type PostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostMutation,
  PostMutationVariables
>;
export const SignupDocument = gql`
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      ...SignupResponse
    }
  }
  ${SignupResponseFragmentDoc}
`;
export type SignupMutationFn = ApolloReactCommon.MutationFunction<
  SignupMutation,
  SignupMutationVariables
>;

export function useSignupMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignupMutation,
    SignupMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument,
    baseOptions
  );
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = ApolloReactCommon.MutationResult<
  SignupMutation
>;
export type SignupMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>;
export const VoteDocument = gql`
  mutation Vote($linkId: ID!) {
    vote(linkId: $linkId) {
      ...VoteResponse
    }
  }
  ${VoteResponseFragmentDoc}
`;
export type VoteMutationFn = ApolloReactCommon.MutationFunction<
  VoteMutation,
  VoteMutationVariables
>;

export function useVoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    VoteMutation,
    VoteMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<VoteMutation, VoteMutationVariables>(
    VoteDocument,
    baseOptions
  );
}
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = ApolloReactCommon.MutationResult<VoteMutation>;
export type VoteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  VoteMutation,
  VoteMutationVariables
>;
