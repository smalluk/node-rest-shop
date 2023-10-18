const express = require('express');
const app = express();
const morgan = require('morgan');
const bosyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/Routes/products');
const orderRoutes = require('./api/Routes/orders');

mongoose.connect("mongodb+srv://danielmidgley:" + process.env.MONGO_ATLAS_PW +"@node-rest-shop.a1p3brl.mongodb.net/?retryWrites=true&w=majority")

app.use(morgan('dev'));
app.use(bosyParser.urlencoded({extended: false}));
app.use(bosyParser.json());

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!'
//     });
//     res.end();
// });

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Error handling

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;