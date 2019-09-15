import React from 'react';

import { useIsLoggedIn } from '@src/hooks/useIsLoggedIn';
import { useLogoutMutation } from '@src/generated/graphql';

interface LogoutProps {}

export const Logout: React.FC<LogoutProps> = () => {
  const [_, setIsLoggedIn] = useIsLoggedIn();
  const [logout, __] = useLogoutMutation({
    onCompleted: () => setIsLoggedIn && setIsLoggedIn(false),
  });

  return (
    <button
      type="button"
      onClick={() => logout()}
      data-testid="logout-button"
    >
      Logout
    </button>
  );
};
