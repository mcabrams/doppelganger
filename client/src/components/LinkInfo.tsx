import React from 'react';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';

import { getAuthToken } from '@src/helpers/auth';
import { timeDifferenceForDate } from '@src/helpers/time';
import {
  LinkInfoFragment, VoteMutation, useVoteMutation,
} from '@src/generated/graphql';

type VoteMutationResult = FetchResult<VoteMutation>;
type LinkId = LinkInfoFragment['id'];
export type UpdateStoreAfterVoteFn = (
  store: DataProxy,
  mutationResult: VoteMutationResult,
  linkId: LinkId
) => void;

type LinkInfoProps = {
  link: LinkInfoFragment;
  index: number;
  updateStoreAfterVote?: UpdateStoreAfterVoteFn;
};

export const LinkInfo: React.FC<LinkInfoProps> = props => {
  const { index, link, updateStoreAfterVote } = props;

  const [vote, _] = useVoteMutation({
    update: (store, mutationResult) => {
      // @ts-ignore TODO: should only do this if passed as prop (it's optional)
      updateStoreAfterVote(store, mutationResult, link.id);
    },
  });

  const authToken = getAuthToken();
  return (
    <div className="flex mt2 items-start" data-testid="link-info">
      <div className="flex items-center">
        <span className="gray">{index + 1}</span>
        {authToken && updateStoreAfterVote && (
          <div
            className="ml1 gray f11 pointer"
            onClick={() => vote({ variables: { linkId: link.id } })}
            role="button"
            tabIndex={0}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description}
          {' '}
          {link.url}
        </div>
        <div className="f6 lh-copy gray">
          {link.votes.length}
          {' '}
          votes | by
          {' '}
          {link.postedBy
            ? link.postedBy.name : 'Unknown'}
          {' '}
          {timeDifferenceForDate(link.createdAt)}
        </div>
      </div>
    </div>
  );
};
