import 'reflect-metadata';

import express, { urlencoded, json } from 'express';
import { UserResolver } from './modules/user/user.resolver';
import { GroupResolver } from './modules/group/group.resolver';
import { buildSchemaSync } from 'type-graphql';
import Container from 'typedi';
import {
  ApolloServerPluginInlineTrace,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { FARGATE_EXPRESS_PORT } from './const';
import { registerProviders } from './providers';

const main = async () => {
  await registerProviders();
  const schema = buildSchemaSync({
    resolvers: [GroupResolver, UserResolver],
    container: Container,
  });

  const graphqlServer = new ApolloServer({
    schema,
    introspection: true,
    debug: true,
    plugins: [
      ApolloServerPluginInlineTrace(),
      ApolloServerPluginLandingPageLocalDefault(),
    ],
  });

  const app = express();
  app.use(urlencoded({ extended: true }));
  app.use(json());

  await graphqlServer.start();

  const generateCORSoptions = () => {
    return {
      origin: 'https://studio.apollographql.com',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    };
  };

  graphqlServer.applyMiddleware({
    app,
    path: `/graphql`,
    cors: generateCORSoptions(),
  });

  app.listen(FARGATE_EXPRESS_PORT, () =>
    console.log(
      `🚀 graphql playground runs at http://localhost:${FARGATE_EXPRESS_PORT}/graphql`
    )
  );
};

main();
