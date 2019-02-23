const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ extended: true }));
app.use("/", routes);
app.use(cors());

app.get("/", (req, res) => {
  res.redirect(`${process.env.forwardingAddress}/shopify`);
});

app.listen(PORT, () => {
  console.log("Shopify Server is starting...!");
});
