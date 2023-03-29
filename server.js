import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./schemaGql.js";
import mongoose from "mongoose";
import { DB_URI, JWT_SECRET } from "./config.js";
import jwt from "jsonwebtoken";
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to mongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("error ", err);
});

//import models here
import "./models/user.js";
import "./models/quotes.js";

import resolvers from "./resolvers.js";

//this is a middleware
const context = ({ req }) => {
  const authorization= req.headers.authorization || ""
  if (authorization) {
    const { userId } = jwt.verify(authorization, JWT_SECRET);
    return { userId };
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
