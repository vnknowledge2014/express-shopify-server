const express = require("express");
const pageRoute = require("./page");
const shopify = require("./shopify");
const router = express.Router();

router.use("/shopify", shopify);
router.use("/pages", pageRoute);

module.exports = router;
