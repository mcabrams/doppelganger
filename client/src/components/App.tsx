import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { Header } from '@src/components/Header';
import { CreateLink } from '@src/components/CreateLink';
import { LinkList } from '@src/components/LinkList';
import { Login } from '@src/components/Login';
import { Search } from '@src/components/Search';

export const App: React.FC = () => (
  <div className="center w85">
    <Header />
    <div className="ph3 pv1 background-gray">
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/new/1" />} />
        <Route exact path="/create" component={CreateLink} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/top" component={LinkList} />
        <Route exact path="/new/:page" component={LinkList} />
      </Switch>
    </div>
  </div>
);
