import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';

import { useIsLoggedIn } from '@src/hooks/useIsLoggedIn';
import {
  CreateUserMutation, useCreateUserMutation, useTokenAuthMutation,
} from '@src/generated/graphql';

type SignupProps = RouteComponentProps;

const USERNAME_FIELD_NAME = 'username';
const PASSWORD_FIELD_NAME = 'password';
const EMAIL_FIELD_NAME = 'email';

export const Signup: React.FC<SignupProps> = ({ navigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedIn();

  useEffect(() => {
    // TODO: Raise error here if navigate not defined
    if (isLoggedIn && navigate) {
      navigate('/');
    }
  });

  const [tokenAuth, { error }] = useTokenAuthMutation({
    variables: { email, password },
    // TODO: Raise error here if setIsLoggedIn is not defined
    onCompleted: () => setIsLoggedIn && setIsLoggedIn(true),
  });

  const requestToken = async (data: CreateUserMutation) => {
    /* TODO: This should raise error */
    if (!data.createUser) {
      return;
    }

    await tokenAuth();
  };

  const [createUser, _] = useCreateUserMutation({
    variables: { email, password, username },
    onCompleted: data => {
      requestToken(data);
    },
  });

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          createUser();
        }}
      >
        <label htmlFor={USERNAME_FIELD_NAME}>
          Username
          <input
            type="text"
            id={USERNAME_FIELD_NAME}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
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
        <button type="submit">Signup</button>
        {error}
      </form>
    </div>
  );
};
