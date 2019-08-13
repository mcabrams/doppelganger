import gql from 'graphql-tag';

import { LINK_INFO_FRAGMENT } from '@src/queries/LINK_INFO_FRAGMENT';

export const LINK_LIST_QUERY = gql`
  query LinkList($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(first: $first, skip: $skip, orderBy: $orderBy) {
      links {
        ...LinkInfo
      }
      count
    }
  }
  ${LINK_INFO_FRAGMENT}
`;
