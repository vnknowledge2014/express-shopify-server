const crypto = require("crypto");
const cookie = require("cookie");
const nonce = require("nonce")();
const querystring = require("querystring");
const request = require("request-promise");

const express = require("express");
const router = express.Router();

const { shop, apiKey, apiSecret, scopes, forwardingAddress } = process.env;

router.get("/", (req, res) => {
  if (shop) {
    const state = nonce();
    const redirectUri = `${forwardingAddress}/shopify/callback`;
    const installUri = `https://${shop}/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&state=${state}&redirect_uri=${redirectUri}`;

    res.cookie("state", state);
    res.redirect(installUri);
  } else {
    return res.status(400).json({
      message:
        "missing shop parameter, Please add ?shop=your-development-shop.myshopify.com to your request"
    });
  }
});

router.get("/callback", (req, res) => {
  const { shop, hmac, code, state } = req.query;
  const cookieState = cookie.parse(req.headers.cookie).state;

  if (cookieState !== state) {
    return res
      .status(403)
      .json({ messeage: "Request origin cannot be verifired" });
  }

  if (shop && hmac && code) {
    const map = Object.assign({}, req.query);
    delete map["signature"];
    delete map["hmac"];
    const message = querystring.stringify(map);
    const providedHmac = Buffer.from(hmac, "utf-8");
    const generatedHash = Buffer.from(
      crypto
        .createHmac("sha256", apiSecret)
        .update(message)
        .digest("hex"),
      "utf-8"
    );
    let hashEquals = false;

    try {
      hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac);
    } catch (e) {
      hashEquals = false;
    }

    if (!hashEquals) {
      return res.status(400).send("HMAC validation failed");
    }

    // DONE: Exchange temporary code for a permanent access token
    const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token`;
    const accessTokenPayload = {
      client_id: apiKey,
      client_secret: apiSecret,
      code
    };

    request
      .post(accessTokenRequestUrl, { json: accessTokenPayload })
      .then(accessTokenResponse => {
        const accessToken = accessTokenResponse.access_token;
        res
          .status(200)
          .json({ message: "Exchange access token successfully", accessToken });
      })
      .catch(error => {
        res.status(error.statusCode).send(error.error.error_description);
      });
  } else {
    res.status(400).send({ message: "Required paramaters missing" });
  }
});

module.exports = router;
