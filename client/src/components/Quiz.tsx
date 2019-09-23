import { Col, Row, Typography } from 'antd';
import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { useRedirectIfLoggedOut } from '@src/hooks/useRedirectIfLoggedOut';

type QuizProps = RouteComponentProps;

const { Title } = Typography;

export const Quiz: React.FC<QuizProps> = ({ navigate }) => {
  useRedirectIfLoggedOut('/quiz', navigate);

  return (
    <Row>
      <Col span={24}>
        <Title data-testid="quiz">
          Quiz
        </Title>
      </Col>
    </Row>
  );
};
