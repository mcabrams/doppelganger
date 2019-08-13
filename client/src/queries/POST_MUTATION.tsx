import gql from 'graphql-tag';

import { LINK_INFO_FRAGMENT } from '@src/queries/LINK_INFO_FRAGMENT';

export const POST_MUTATION = gql`
  mutation Post($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      ...LinkInfo
    }
  }
  ${LINK_INFO_FRAGMENT}
`;
