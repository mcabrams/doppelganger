import { Layout } from 'antd';
import React from 'react';
import { Router } from '@reach/router';

import { Home } from '@src/components/Home';
import { Login } from '@src/components/Login';
import { Nav } from '@src/components/Nav';
import { Signup } from '@src/components/Signup';
import { UserList } from '@src/components/UserList';
import { ROUTES } from '@src/constants/routes';

export const App: React.FC = () => (
  <Layout>
    <Layout.Header>
      <Nav />
    </Layout.Header>
    <Layout.Content style={{ padding: '20px' }}>
      <Router>
        <Home path={ROUTES.home} />
        <Login path={ROUTES.login} />
        <Signup path={ROUTES.signup} />
        <UserList path={ROUTES['user-list']} />
      </Router>
      <img src={ROUTES.csrftoken} alt="" />
    </Layout.Content>
  </Layout>
);
