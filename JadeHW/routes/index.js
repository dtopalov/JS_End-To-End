"use strict";

let express = require('express'),
    router = express.Router(),
    phones = require('../public/data/phones-data'),
    tablets = require('../public/data/tablets-data'),
    wearables = require('../public/data/wearables-data');

router.get('/phones', function (req, res) {
    res.render('phones', {title: 'Phones', data: phones});
});
router.get('/tablets', function (req, res) {
    res.render('tablets', {title: 'Tablets', data: tablets});
});
router.get('/wearables', function (req, res) {
    res.render('wearables', {title: 'Wearables', data: wearables});
});

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        title: 'Home'
    });
});

module.exports = router;
