import { Col, Row, Typography } from 'antd';
import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useDispatch } from 'react-redux';

import { ROUTES } from '@src/constants/routes';
import { useIsLoggedIn } from '@src/hooks/useIsLoggedIn';
import { setAuthRedirectLocation } from '@src/redux/authRedirect/actions';

type QuizProps = RouteComponentProps;

const { Title } = Typography;

export const Quiz: React.FC<QuizProps> = ({ navigate }) => {
  const [isLoggedIn, _] = useIsLoggedIn();
  const dispatch = useDispatch();

  if (!isLoggedIn) {
    dispatch(setAuthRedirectLocation('/quiz'));
    if (navigate) {
      navigate(ROUTES.signup);
    }
  }

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
