import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { setAuthToken } from '@src/helpers/auth';
import {
  LoginMutation,
  SignupMutation,
  useLoginMutation,
  useSignupMutation,
} from '@src/generated/graphql';

interface LoginProps {}

const saveUserData = (token: string) => setAuthToken(token);

export const Login: React.FC<RouteComponentProps<LoginProps>> = props => {
  const [isLoggedIn, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const confirmLogin = async (data: LoginMutation) => {
    /* TODO: Starting here, these should raise errors */
    if (!data.login) {
      return;
    }
    if (data.login.__typename !== 'AuthPayload') {
      return;
    }
    const { token } = data.login;
    if (!token) {
      return;
    }
    /* TODO: Ending here, these should raise errors */

    saveUserData(token);
    props.history.push('/');
  };

  const [login, _] = useLoginMutation({
    variables: { email, password },
    onCompleted: data => confirmLogin(data),
  });

  const confirmSignup = async (data: SignupMutation) => {
    /* TODO: Starting here, these should raise errors */
    if (!data.signup) {
      return;
    }
    if (data.signup.__typename !== 'AuthPayload') {
      return;
    }
    const { token } = data.signup;
    if (!token) {
      return;
    }
    /* TODO: Ending here, these should raise errors */

    saveUserData(token);
    props.history.push('/');
  };

  const [signup, __] = useSignupMutation({
    variables: { email, password, name },
    onCompleted: data => confirmSignup(data),
  });

  return (
    <div>
      <h4 className="mv3" data-testid="login-register-heading">
        {isLoggedIn ? 'Login' : 'Sign Up'}
      </h4>
      <div className="flex flex-column">
        {!isLoggedIn && (
          <input
            data-testid="name-input"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
          />
        )}
        <input
          data-testid="email-input"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email address"
        />
        <input
          data-testid="password-input"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>
      <div className="flex mt3">
        {isLoggedIn ? (
          <button
            data-testid="login-link"
            type="submit"
            className="pointer mr2 button"
            onClick={() => login()}
          >
            login
          </button>
        ) : (
          <button
            data-testid="create-account-button"
            type="submit"
            className="pointer mr2 button"
            onClick={() => signup()}
          >
            create account
          </button>
        )}
        <button
          data-testid="toggle-authentication-type-button"
          className="pointer button"
          onClick={() => setLogin(!isLoggedIn)}
          type="button"
        >
          {isLoggedIn
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
      </div>
    </div>
  );
};
