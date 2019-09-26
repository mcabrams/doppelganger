import { Col, Row, Typography } from 'antd';
import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { isDefined } from '@src/helpers/presence';
import { useRedirectIfLoggedOut } from '@src/hooks/useRedirectIfLoggedOut';
import { useQuestionsQuery } from '@src/generated/graphql';

type QuizProps = RouteComponentProps;

const { Title } = Typography;

export const Quiz: React.FC<QuizProps> = ({ navigate }) => {
  useRedirectIfLoggedOut('/quiz', navigate);

  const { data } = useQuestionsQuery();

  const questionNodes = data && data.questions && data.questions.edges.map(
    question => (question && question.node),
  ).filter(isDefined);


  return (
    <Row>
      <Col span={24}>
        <Title data-testid="quiz">
          Quiz
        </Title>
        <Col span={24}>
          {questionNodes && questionNodes.map(question => (
            <p key={question.text}>{question.text}</p>
          ))}
        </Col>
      </Col>
    </Row>
  );
};
