import {
  Col, Row, Typography, Spin,
} from 'antd';
import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { ROUTES } from '@src/constants/routes';
import { useComputeDoppelgangerQuery } from '@src/generated/graphql';

import { useRedirectIfLoggedOut } from '@src/hooks/useRedirectIfLoggedOut';

type FindDoppelgangerProps = RouteComponentProps;

const { Title, Paragraph } = Typography;

export const FindDoppelganger: React.FC<FindDoppelgangerProps> = ({ navigate }) => {
  useRedirectIfLoggedOut(ROUTES.findDoppelganger, navigate);
  const { data, loading } = useComputeDoppelgangerQuery();

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Title data-testid="find-doppelganger-heading">
          Find Your Doppelganger
        </Title>
        {data?.computeDoppelganger?.doppelgangerInfo?.score
        && data?.computeDoppelganger?.userProfile && (
          <>
            <Paragraph data-testid="doppelganger-username">
              {data.computeDoppelganger.userProfile.user.username}
            </Paragraph>
            <Paragraph data-testid="doppelganger-score">
              {(data.computeDoppelganger.doppelgangerInfo.score * 100).toFixed(2)}
              %
            </Paragraph>
          </>
        )}
        {loading && <Spin />}
      </Col>
    </Row>
  );
};
