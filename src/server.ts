import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { dbSchema } from './db/schema';

const app = express();
const port = parseInt(process.env.PORT || '4000');

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: dbSchema
}));

app.listen(port, () => {
  console.log(`Express listening on port ${port}`)
});