import React from 'react';
import { Provider } from 'react-redux';
import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import store from '@src/redux/store';
import { QUIZ_QUERY } from '@src/queries/QUIZ_QUERY';
import { QuizQueryResult } from '@src/generated/graphql';
import { Quiz } from '../Quiz';

const result: Pick<QuizQueryResult, 'data'> = {
  data: {
    questions: {
      edges: [
        {
          node: {
            id: 'UXVlc3Rpb25UeXBlOjE=',
            pk: 1,
            text: 'Who would win - Darth Vader or Darth Maul?',
            answers: [
              {
                pk: 2,
                text: 'Darth Maul',
                __typename: 'AnswerType',
              },
              {
                pk: 1,
                text: 'Darth Vader',
                __typename: 'AnswerType',
              },
            ],
            __typename: 'QuestionType',
          },
          __typename: 'QuestionEdge',
        },
        {
          node: {
            id: 'UXVlc3Rpb25UeXBlOjI=',
            pk: 2,
            text: 'Skrillex or Zomboy?',
            answers: [
              {
                pk: 4,
                text: 'Zomboy',
                __typename: 'AnswerType',
              },
              {
                pk: 3,
                text: 'Skrillex',
                __typename: 'AnswerType',
              },
            ],
            __typename: 'QuestionType',
          },
          __typename: 'QuestionEdge',
        },
      ],
      __typename: 'QuestionConnection',
    },
  },
};

const mocks = [
  {
    request: {
      query: QUIZ_QUERY,
    },
    result,
  },
];

describe('Quiz', () => {
  it('renders without error', () => {
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Quiz />
        </MockedProvider>
      </Provider>,
    );
  });
});
