import 'reflect-metadata';

import express, { urlencoded, json } from 'express';
import { FARGATE_EXPRESS_PORT } from './const';
import { registerProviders } from './providers';
import { launchNodeProcessMonitor } from './common/error/nodeProcess.handler';
import { generateCORSoptions } from './common/bootstrap/generateCORS.bootstrap';
import { graphqlServer } from './common/bootstrap/apollo.bootstrap';

const main = async () => {
  launchNodeProcessMonitor();
  await registerProviders();

  const app = express();
  app.use(urlencoded({ extended: true }));
  app.use(json({limit: "2000mb"}));

  // * ================ graphql as middleware =============
  await graphqlServer.start();
  graphqlServer.applyMiddleware({
    app,
    path: `/graphql`,
    cors: generateCORSoptions(),
  });
  // * ================ graphql as middleware =============

  app.listen(FARGATE_EXPRESS_PORT, () =>
    console.log(
      `🚀 graphql playground runs at http://localhost:${FARGATE_EXPRESS_PORT}/graphql`
    )
  );
};

main();
