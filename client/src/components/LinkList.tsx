import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { LINKS_PER_PAGE } from '@src/constants';
import { LINK_LIST_QUERY } from '@src/queries/LINK_LIST_QUERY';
import { NEW_LINKS_SUBSCRIPTION } from '@src/queries/NEW_LINKS_SUBSCRIPTION';
import { NEW_VOTES_SUBSCRIPTION } from '@src/queries/NEW_VOTES_SUBSCRIPTION';
import { LinkInfo, UpdateStoreAfterVoteFn } from '@src/components/LinkInfo';
import {
  LinkListQuery, LinkOrderByInput, useLinkListQuery,
} from '@src/generated/graphql';
import { ObservableQuery } from 'apollo-client';

const getIsNewPage = (location: LinkListProps['location']) => location.pathname.includes('new');

const getLinkListVariables = (
  location: LinkListProps['location'],
  match: LinkListProps['match'],
) => {
  const isNewPage = getIsNewPage(location);
  const page = parseInt(match.params.page, 10);

  const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
  const first = isNewPage ? LINKS_PER_PAGE : 100;
  const orderBy = isNewPage ? LinkOrderByInput.CreatedAtDesc : null;
  return { skip, first, orderBy };
};


type GetUpdateCacheAfterVote = (
  location: LinkListProps['location'],
  match: LinkListProps['match'],
) => UpdateStoreAfterVoteFn;

const getUpdateCacheAfterVote: GetUpdateCacheAfterVote = (location, match) => {
  const variables = getLinkListVariables(location, match);

  return (store, mutationResult, linkId) => {
    const data = store.readQuery<LinkListQuery>({
      query: LINK_LIST_QUERY,
      variables,
    });

    // TODO: Should raise error here
    if (!data) {
      return;
    }

    const votedLink = data.feed.links.find(link => link.id === linkId);

    // TODO: Should raise error here
    if (!votedLink
        || !mutationResult
          || !mutationResult.data
            || !mutationResult.data.vote) {
      return;
    }

    votedLink.votes = mutationResult.data.vote.link.votes;

    store.writeQuery({ query: LINK_LIST_QUERY, data });
  };
};
type LinkListObservableQuery = ObservableQuery<LinkListQuery>
type SubscribeToMore = LinkListObservableQuery['subscribeToMore'];

const subscribeToNewLinks = (subscribeToMore: SubscribeToMore) => {
  subscribeToMore({
    document: NEW_LINKS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) {
        return prev;
      }
      // @ts-ignore TODO: Not sure how to fix this
      const { newLink } = subscriptionData.data;
      const exists = prev.feed.links.find(({ id }) => id === newLink.id);
      if (exists) {
        return prev;
      }

      return {
        ...prev,
        feed: {
          links: [newLink, ...prev.feed.links],
          count: prev.feed.links.length + 1,
          __typename: prev.feed.__typename,
        },
      };
    },
  });
};

const subscribeToNewVotes = (subscribeToMore: SubscribeToMore) => {
  subscribeToMore({
    document: NEW_VOTES_SUBSCRIPTION,
  });
};

const getLinksToRender = (
  data: LinkListQuery,
  location: LinkListProps['location'],
) => {
  const isNewPage = getIsNewPage(location);

  if (isNewPage) {
    return data.feed.links;
  }
  const rankedLinks = data.feed.links.slice();
  rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);
  return rankedLinks;
};

type LinkListProps = RouteComponentProps<{page: string;}>;

export const LinkList: React.FC<LinkListProps> = props => {
  const { location, match } = props;
  const nextPage = (data: LinkListQuery) => {
    const page = parseInt(match.params.page, 10);
    if (page <= data.feed.count / LINKS_PER_PAGE) {
      const nextPageIndex = page + 1;
      props.history.push(`/new/${nextPageIndex}`);
    }
  };

  const previousPage = () => {
    const page = parseInt(match.params.page, 10);
    if (page > 1) {
      const previousPageIndex = page - 1;
      props.history.push(`/new/${previousPageIndex}`);
    }
  };

  const updateCacheAfterVote = getUpdateCacheAfterVote(location, match);
  const {
    loading, error, data, subscribeToMore,
  } = useLinkListQuery({
    variables: getLinkListVariables(location, match),
  });

  if (loading) return <div>Fetching</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>No data</div>;

  subscribeToNewLinks(subscribeToMore);
  subscribeToNewVotes(subscribeToMore);
  const linksToRender = getLinksToRender(data, location);
  const isNewPage = getIsNewPage(location);
  const pageIndex = match.params.page
    ? (parseInt(match.params.page, 10) - 1) * LINKS_PER_PAGE : 0;

  return (
    <>
      {linksToRender.map((link, index) => (
        <LinkInfo
          key={link.id}
          link={link}
          index={index + pageIndex}
          updateStoreAfterVote={updateCacheAfterVote}
        />
      ))}
      {isNewPage && (
        <div className="flex ml4 mv3 gray">
          <button type="button" className="pointer mr2" onClick={previousPage}>
            Previous
          </button>
          <button type="button" className="pointer" onClick={() => nextPage(data)}>
            Next
          </button>
        </div>
      )}
    </>
  );
};
