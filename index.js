const dotenv = require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request-promise');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    request({
        method: 'GET',
        uri: `https://0882227c.ngrok.io/shopify`,
        // https://mia-underwear-vn.myshopify.com/admin/oauth/authorize?client_id=45005c8c5e5546151c96dd33f558729f&scope=read_products,%20write_products,%20read_content,%20write_content&state=155074618211800&redirect_uri=https://2f35bf44.ngrok.io/shopify/callback
        // https://2f35bf44.ngrok.io/shopify/callback?code=8f595ee48ea4b7c1714f0e2e4199a21b&hmac=5fd9fce4a36da96cf04ec294c64144f012772397aaaab561dc474c1652768fae&shop=mia-underwear-vn.myshopify.com&state=155074618211800&timestamp=1550746183
        // headers: {
        //     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        //     'Accept-Encoding': 'gzip, deflate, br',
        //     'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
        //     'Cache-Control': 'no-cache',
        //     'Connection': 'keep-alive',
        //     'DNT': 1,
        //     'Host': process.env.forwardingAddress,
        //     'Pragma': 'no-cache',
        //     'Upgrade-Insecure-Requests': 1,
        //     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36'
        // },
        resolveWithFullResponse: true,
        json: true
    }).then((rs) => console.log(rs));
    // res.status(200).json({ message: 'request successfully' });
    
});

app.use('/', routes);

app.listen(PORT, () => {
    console.log('Shopify Server is starting...!');
})
