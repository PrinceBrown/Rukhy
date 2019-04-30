const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send('Show All Products')
})

router.get('/product-details', (req, res, next) => {
    res.status(200).send('Single Item specification')
})

router.get('/orders', (req, res, next) => {
    res.status(200).send('Cart Page')
})

router.get('/order-history', (req, res, next) => {
    res.status(200).send('Order history')
})

router.get('/account', (req, res, next) => {
    res.status(200).send('account information')
})


module.exports = router;