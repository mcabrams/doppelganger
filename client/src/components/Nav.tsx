import React from 'react';
import { Link } from '@reach/router';

import { Logout } from '@src/components/Logout';
import { ROUTES } from '@src/constants/routes';
import { useIsLoggedIn } from '@src/hooks/useIsLoggedIn';

interface NavProps {}

export const Nav: React.FC<NavProps> = () => {
  const [isLoggedIn, _] = useIsLoggedIn();

  return (
    <div>
      <Link to={ROUTES.home}>Home</Link>
      {!isLoggedIn ? (
        <>
          <Link to={ROUTES.login}>Login</Link>
          <Link to={ROUTES.signup}>Signup</Link>
        </>
      ) : (
        <Logout />
      )}
      <Link to={ROUTES['user-list']}>User List</Link>
    </div>
  );
};
