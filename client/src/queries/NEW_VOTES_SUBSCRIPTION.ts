import gql from 'graphql-tag';

import { LINK_INFO_FRAGMENT } from '@src/queries/LINK_INFO_FRAGMENT';

export const NEW_VOTES_SUBSCRIPTION = gql`
  subscription NewVotes {
    newVote {
      ...NewVoteFragment
    }
  }
  fragment NewVoteFragment on Vote {
    id
    link {
      ...LinkInfo
    }
    user {
      id
    }
  }
  ${LINK_INFO_FRAGMENT}
`;
