import gql from 'graphql-tag';
import { toPromise } from 'apollo-link';

import { startTestServer } from '@src/__tests__/utils';
import { prisma } from '@src/generated/prisma-client';
import { server } from '@src/server';

describe('server end to end', () => {
  it('should get a link', async () => {
    const { id } = await prisma.createLink({ description: 'foo', url: 'bar' });
    const GET_LINK = gql`
      query link($id: ID!) {
        link(id: $id) {
          id
        }
      }
    `;
    const testServer = await startTestServer(server);
    const res = await toPromise(testServer.graphql({
      query: GET_LINK,
      variables: { id },
    }));
    await testServer.stop();
    expect(res.data && res.data.link.id).toEqual(id);
  });
});
