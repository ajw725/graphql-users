import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import _ from 'lodash';
import axios from 'axios';

const serverUrl = 'http://localhost:3000';
const client = axios.create({ baseURL: serverUrl });

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve: async (_parentValue, args) => {
        const path = `${serverUrl}/users/${args.id}`;
        const resp = await client.get(path);
        return resp.data;
      },
    },
  },
});

export const DbSchema = new GraphQLSchema({
  types: [UserType],
  query: RootQuery,
});
