import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { useGetUserListQuery } from '@src/generated/graphql';

type UserListProps = RouteComponentProps;

export const UserList: React.FC<UserListProps> = () => {
  const { data, error } = useGetUserListQuery();
  const userList = data && data.getUserList;

  return (
    <div>
      {userList && userList.map(user => (
        <p key={user.username}>{user.username}</p>
      ))}
      {error}
    </div>
  );
};
