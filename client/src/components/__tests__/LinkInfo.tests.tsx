import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { LinkInfoFragment } from '@src/generated/graphql';
import { LinkInfo } from '../LinkInfo';

const description = 'foo';

const link: LinkInfoFragment = {
  description,
  __typename: 'Link',
  createdAt: new Date(),
  id: '1',
  postedBy: {
    __typename: 'User',
    id: '1',
    name: 'user',
  },
  url: 'bar.com',
  votes: [],
};

describe('LinkInfo', () => {
  it('should contain link description', () => {
    const { getByTestId } = render(
      <LinkInfo
        index={1}
        link={link}
      />,
    );
    expect(getByTestId('link-info')).toHaveTextContent(description);
  });
});
