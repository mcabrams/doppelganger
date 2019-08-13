import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { LinkInfo } from '@src/components/LinkInfo';

import {
  FeedSearchQuery,
  FeedSearchQueryVariables,
  LinkInfoFragment,
} from '@src/generated/graphql';
import { FEED_SEARCH_QUERY } from '@src/queries/FEED_SEARCH_QUERY';

interface SearchProps {}

export const Search: React.FC<SearchProps> = () => {
  const [links, setLinks] = useState<LinkInfoFragment[]>([]);
  const [filter, setFilter] = useState('');
  const [search, _] = (
    useLazyQuery<FeedSearchQuery, FeedSearchQueryVariables>(
      FEED_SEARCH_QUERY,
      {
        onCompleted: data => setLinks(data.feed.links),
      },
    )
  );

  return (
    <div>
      <div>
        Search
        <input type="text" onChange={e => setFilter(e.target.value)} />
        <button
          type="submit"
          onClick={() => search({
            variables: { filter },
          })}
        >
          OK
        </button>
      </div>
      {links.map((link, index) => (
        <LinkInfo
          key={link.id}
          link={link}
          index={index}
        />
      ))}
    </div>
  );
};
