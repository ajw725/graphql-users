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
const UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: graphql_1.GraphQLString },
        firstName: { type: graphql_1.GraphQLString },
        age: { type: graphql_1.GraphQLInt },
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
    },
});
exports.DbSchema = new graphql_1.GraphQLSchema({
    types: [UserType],
    query: RootQuery,
});
