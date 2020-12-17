"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbSchema = void 0;
const graphql_1 = require("graphql");
const axios_1 = __importDefault(require("axios"));
const serverUrl = 'http://localhost:3000';
const client = axios_1.default.create({ baseURL: serverUrl });
const CompanyType = new graphql_1.GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        users: {
            type: new graphql_1.GraphQLList(UserType),
            resolve: async (parentValue, _args) => {
                const resp = await client.get(`/companies/${parentValue.id}/users`);
                return resp.data;
            },
        },
    }),
});
const UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: graphql_1.GraphQLString },
        firstName: { type: graphql_1.GraphQLString },
        age: { type: graphql_1.GraphQLInt },
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
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                id: {
                    type: graphql_1.GraphQLString,
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
                    type: graphql_1.GraphQLString,
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
const RootMutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                },
                age: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
                },
                companyId: {
                    type: graphql_1.GraphQLString,
                },
            },
            resolve: async (_parentValue, { firstName, age }) => {
                const resp = await client.post('/users', { firstName, age });
                return resp.data;
            },
        },
    },
});
exports.DbSchema = new graphql_1.GraphQLSchema({
    types: [UserType, CompanyType],
    query: RootQuery,
    mutation: RootMutation,
});
