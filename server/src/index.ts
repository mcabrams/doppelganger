import http from 'http';
import express from 'express';
import compression from 'compression';

import { server } from '@src/server';

const app = express();
server.applyMiddleware({ app });
app.use(compression());

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);
// eslint-disable-next-line no-console
httpServer.listen({ port: 4000 }, () => console.log(`🚀 Server ready at path ${server.graphqlPath}`));
