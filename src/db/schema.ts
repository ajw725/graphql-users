import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import _ from 'lodash';
import axios from 'axios';

const serverUrl = 'http://localhost:3000';
const client = axios.create({ baseURL: serverUrl });

const CompanyType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (parentValue, _args) => {
        const resp = await client.get(`/companies/${parentValue.id}/users`);
        return resp.data;
      },
    },
  }),
});

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve: async (parentValue, _args) => {
        const companyId = parentValue.companyId;
        const resp = await client.get(`/companies/${companyId}`);
        return resp.data;
      },
    },
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

    company: {
      type: CompanyType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve: async (_parentValue, args) => {
        const path = `${serverUrl}/companies/${args.id}`;
        const resp = await client.get(path);
        return resp.data;
      },
    },
  },
});

export const DbSchema = new GraphQLSchema({
  types: [UserType, CompanyType],
  query: RootQuery,
});
