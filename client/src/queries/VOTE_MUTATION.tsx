import gql from 'graphql-tag';

export const VOTE_MUTATION = gql`
  mutation Vote($linkId: ID!) {
    vote(linkId: $linkId) {
      ...VoteResponse
    }
  }
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
