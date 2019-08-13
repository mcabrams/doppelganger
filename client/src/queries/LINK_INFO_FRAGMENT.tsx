import gql from 'graphql-tag';

export const LINK_INFO_FRAGMENT = gql`
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
