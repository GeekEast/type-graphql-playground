import {
  ApolloServerPluginInlineTrace,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { buildSchemaSync } from 'type-graphql';
import Container from 'typedi';
import { GroupResolver } from '../../modules/group/group.resolver';
import { UserResolver } from '../../modules/user/user.resolver';

const schema = buildSchemaSync({
  resolvers: [GroupResolver, UserResolver],
  container: Container,
});

export const graphqlServer = new ApolloServer({
  schema,
  introspection: true,
  debug: true,
  plugins: [
    ApolloServerPluginInlineTrace(),
    ApolloServerPluginLandingPageLocalDefault(),
  ],
});
