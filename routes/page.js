const express = require('express');
const request = require('request-promise');

const router = express.Router();
const shop = process.env.SHOPIFY_NAME;
const pageURI = `https://${shop}/admin/pages.json`;

router.get('/', (req, res) => {
    request({
        method: 'GET',
        uri: 'https://mia-underwear-vn.myshopify.com/admin/pages.json',
        headers: {
            'X-Shopify-Access-Token': '2bb3ccfba03cac97d54576934f1926df',
            'client_id': '45005c8c5e5546151c96dd33f558729f',
            'client_secret': 'ffa4b690829c8960eda61024b8e98c4c' 
        },
        json: true,
    }).then((rs) => {
        res.json(rs);
    })
})

router.post('/', (req, res) => {
    const apiRequestHeader = {
        'client_id': process.env.apiKey,
        'client_secret': process.env.apiSecret,
        'X-Shopify-Access-Token': process.env.token,
    };

    console.log(apiRequestHeader)
    request({
               method: 'POST',
               header: apiRequestHeader,
               uri: pageURI,
               body: 'test',
               json: true
    }).then((shopResponse) => {
        res.status(200).send(shopResponse);
    }).catch((error) => {
        res.status(error.statusCode).send(error);
    })

});

module.exports = router;