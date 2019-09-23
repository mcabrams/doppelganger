import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { useUsersQuery } from '@src/generated/graphql';

type UserListProps = RouteComponentProps;

export const UserList: React.FC<UserListProps> = () => {
  const { data, error } = useUsersQuery();
  const users = data && data.users;

  return (
    <div>
      {users && users.map(user => (
        <p key={user.username}>{user.username}</p>
      ))}
      {error}
    </div>
  );
};
