const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../Models/products');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    });
});

router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.patch('/:productID', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    })
});

router.delete('/:productID', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    })
});

module.exports = router;