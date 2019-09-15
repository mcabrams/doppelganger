import React from 'react';
import { RouteComponentProps } from '@reach/router';

type HomeProps = RouteComponentProps;

export const Home: React.FC<HomeProps> = () => (
  <div data-testid="home">
    Hello world!
  </div>
);
