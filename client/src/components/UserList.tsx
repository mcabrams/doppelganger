import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { useUserListQuery } from '@src/generated/graphql';

type UserListProps = RouteComponentProps;

export const UserList: React.FC<UserListProps> = () => {
  const { data, error } = useUserListQuery();
  const userList = data && data.userList;

  return (
    <div>
      {userList && userList.map(user => (
        <p key={user.username}>{user.username}</p>
      ))}
      {error}
    </div>
  );
};
