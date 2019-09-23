import gql from 'graphql-tag';

export const USER_LIST_QUERY = gql`
  query UserList {
    userList {
      ...UserListResponse
    }
  }
  fragment UserListResponse on UserPublicType {
    username
  }
`;
