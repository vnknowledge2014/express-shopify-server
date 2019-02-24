const dotenv = require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/schema");
const { resolvers } = require("./resolver/resolver");

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ extended: true }));
app.use("/", routes);
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

server.applyMiddleware({ app });

app.get("/", (req, res) => {
  res.redirect(`${process.env.forwardingAddress}/shopify`);
});

app.listen(PORT, () => {
  console.log("Shopify Server is starting...!");
});
