const express = require("express");
const request = require("request-promise");

const router = express.Router();
const shop = process.env.shop;
const pageURI = `https://${shop}/admin/pages`;

// Show info a single page
router.get("/page", (req, res) => {
  request({
    method: "GET",
    uri: `${pageURI}/${req.query["id"]}.json`,
    headers: {
      "X-Shopify-Access-Token": process.env.accessToken,
      client_id: process.env.apiKey,
      client_secret: process.env.apiSecret
    },
    json: true
  })
    .then(rs => {
      res.json(rs);
    })
    .catch(error => {
      res.send(error);
    });
});

// Show number of pages we had
router.get("/count", (req, res) => {
  request({
    method: "GET",
    uri: `${pageURI}/count.json`,
    headers: {
      "X-Shopify-Access-Token": process.env.accessToken,
      client_id: process.env.apiKey,
      client_secret: process.env.apiSecret
    },
    json: true
  })
    .then(rs => {
      res.json(rs);
    })
    .catch(error => {
      res.send(error);
    });
});

// Show all pages
router.get("/", (req, res) => {
  request({
    method: "GET",
    uri: `${pageURI}.json`,
    headers: {
      "X-Shopify-Access-Token": process.env.accessToken,
      client_id: process.env.apiKey,
      client_secret: process.env.apiSecret
    },
    json: true
  })
    .then(rs => {
      res.json(rs);
    })
    .catch(error => {
      res.send(error);
    });
});

// Create a page
router.post("/", (req, res) => {
  request({
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": process.env.accessToken,
      client_id: process.env.apiKey,
      client_secret: process.env.apiSecret
    },
    uri: `${pageURI}.json`,
    body: {
      page: req.body
    },
    json: true
  })
    .then(shopResponse => {
      res.json({ message: shopResponse });
    })
    .catch(error => {
      res.send(error);
    });
});

// Update a page
router.put("/", (req, res) => {
  request({
    method: "PUT",
    headers: {
      "X-Shopify-Access-Token": process.env.accessToken,
      client_id: process.env.apiKey,
      client_secret: process.env.apiSecret
    },
    uri: `${pageURI}/${req.body.id}.json`,
    body: {
      page: req.body
    },
    json: true
  })
    .then(() => {
      res.json({ message: `${req.body.id} updated` });
    })
    .catch(error => {
      res.send(error);
    });
});

// Delete a page
router.delete("/", (req, res) => {
  request({
    method: "DELETE",
    headers: {
      "X-Shopify-Access-Token": process.env.accessToken,
      client_id: process.env.apiKey,
      client_secret: process.env.apiSecret
    },
    uri: `${pageURI}/${req.body.id}.json`,
    json: true
  })
    .then(() => {
      res.json({ message: `Delete ${req.body.id} sucessfully` });
    })
    .catch(error => {
      res.send(error);
    });
});

module.exports = router;
