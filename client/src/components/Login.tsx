import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';

import { useIsLoggedIn } from '@src/hooks/useIsLoggedIn';
import { useTokenAuthMutation } from '@src/generated/graphql';

type LoginProps = RouteComponentProps;

const PASSWORD_FIELD_NAME = 'password';
const EMAIL_FIELD_NAME = 'email';

export const Login: React.FC<LoginProps> = ({ navigate }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedIn();

  useEffect(() => {
    // TODO: Raise error here if navigate not defined
    if (isLoggedIn && navigate) {
      navigate('/');
    }
  });

  const [tokenAuth, __] = useTokenAuthMutation({
    variables: { email, password },
    // TODO: Raise error here if setIsLoggedIn is not defined
    onCompleted: () => setIsLoggedIn && setIsLoggedIn(true),
  });

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          tokenAuth();
        }}
      >
        <label htmlFor={EMAIL_FIELD_NAME}>
          Email
          <input
            type="email"
            id={EMAIL_FIELD_NAME}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor={PASSWORD_FIELD_NAME}>
          Password
          <input
            type="password"
            id={PASSWORD_FIELD_NAME}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
