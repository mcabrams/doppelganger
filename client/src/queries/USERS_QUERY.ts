import gql from 'graphql-tag';

export const USERS_QUERY = gql`
  query Users {
    users {
      ...UsersResponse
    }
  }
  fragment UsersResponse on UserPublicType {
    username
  }
`;
