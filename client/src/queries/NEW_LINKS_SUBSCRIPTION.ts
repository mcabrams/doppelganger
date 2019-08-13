import gql from 'graphql-tag';

import { LINK_INFO_FRAGMENT } from '@src/queries/LINK_INFO_FRAGMENT';

export const NEW_LINKS_SUBSCRIPTION = gql`
  subscription NewLinks {
    newLink {
      ...LinkInfo
    }
  }
  ${LINK_INFO_FRAGMENT}
`;
