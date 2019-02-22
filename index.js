const dotenv = require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/", routes);
app.use(cors());

app.get("/", (req, res) => {
  res.redirect(`https://a0890fd7.ngrok.io/shopify`);
});

app.listen(PORT, () => {
  console.log("Shopify Server is starting...!");
});
