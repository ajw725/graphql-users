import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { DbSchema } from './db/schema';

const app = express();
const port = parseInt(process.env.PORT || '4000');

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema: DbSchema,
  })
);

app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});
