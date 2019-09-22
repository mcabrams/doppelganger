import { createStandardAction } from 'typesafe-actions';

export const setAuthRedirectLocation = createStandardAction(
  '@@authRedirect/SET_AUTH_REDIRECT_LOCATION',
)<string>();

export const clearAuthRedirectLocation = createStandardAction(
  '@@authRedirect/CLEAR_AUTH_REDIRECT_LOCATION',
)();
