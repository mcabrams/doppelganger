import gql from 'graphql-tag';

import { LINK_INFO_FRAGMENT } from '@src/queries/LINK_INFO_FRAGMENT';

export const FEED_SEARCH_QUERY = gql`
  query FeedSearch($filter: String!) {
    feed(filter: $filter) {
      links {
        ...LinkInfo
      }
    }
  }
  ${LINK_INFO_FRAGMENT}
`;
