const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const routes = require("./routes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-
app.use(bodyParser.raw({ extended: true })); // for parsing application/x-www-form-
app.use(bodyParser.json({ extended: true })); // for parsing application/x-www-form-
app.use(bodyParser.text({ extended: true })); // for parsing application/x-www-form-
app.use("/", routes);
app.use(cors());

app.get("/", (req, res) => {
  res.redirect(`https://a0890fd7.ngrok.io/shopify`);
});

app.listen(PORT, () => {
  console.log("Shopify Server is starting...!");
});
