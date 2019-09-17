import gql from 'graphql-tag';

export const GET_USER_LIST_QUERY = gql`
  query GetUserList {
    getUserList {
      ...GetUserListResponse
    }
  }
  fragment GetUserListResponse on UserPublicType {
    username
  }
`;
