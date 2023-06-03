import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
import express from "express";

const app = express();

app.use(
  "/graphql",
  new graphqlHTTP({
    schema,
    graphiql: true,
  })
);

export default app;
