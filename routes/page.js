const express = require("express");
const request = require("request-promise");

const router = express.Router();
const shop = process.env.shop;
const pageURI = `https://${shop}/admin/pages.json`;

router.get("/", (req, res) => {
  request({
    method: "GET",
    uri: "https://mia-underwear-vn.myshopify.com/admin/pages.json",
    headers: {
      "X-Shopify-Access-Token": process.env.accessToken,
      "client_id": process.env.apiKey,
      "client_secret": process.env.apiSecret
    },
    json: true
  }).then(rs => {
    res.json(rs);
  });
});

router.post("/", (req, res) => {
  const apiRequestHeader = {
    "X-Shopify-Access-Token": process.env.accessToken,
    "client_id": process.env.apiKey,
    "client_secret": process.env.apiSecret
  };

  request({
    method: "POST",
    header: apiRequestHeader,
    uri: pageURI,
    body: "test",
    json: true
  })
    .then(shopResponse => {
      res.send(shopResponse);
    })
    .catch(error => {
      res.send(error);
    });
});

module.exports = router;
