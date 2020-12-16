"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./db/schema");
const app = express_1.default();
const port = parseInt(process.env.PORT || '4000');
app.use('/graphql', express_graphql_1.graphqlHTTP({
    graphiql: true,
    schema: schema_1.DbSchema,
}));
app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
});
