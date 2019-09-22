import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigateFn } from '@reach/router';

import { useIsLoggedIn } from '@src/hooks/useIsLoggedIn';
import { clearAuthRedirectLocation } from '@src/redux/authRedirect/actions';
import { getAuthRedirectLocation } from '@src/redux/authRedirect/selectors';
import { useTypedSelector } from '@src/redux/use-typed-selector';

export const useRedirectIfLoggedIn = (navigate?: NavigateFn) => {
  const [isLoggedIn, _] = useIsLoggedIn();
  const dispatch = useDispatch();
  const authRedirectLocation = useTypedSelector(
    state => getAuthRedirectLocation(state.authRedirect),
  );

  useEffect(() => {
    // TODO: Raise error here if navigate not defined
    if (isLoggedIn && navigate) {
      dispatch(clearAuthRedirectLocation());
      navigate(authRedirectLocation || '/');
    }
  });
};
