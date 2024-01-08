const express = require('express');
const axios = require('axios');
const config = require('../config');

var router = express.Router();

router.get('siteSearch', (req, res) => {
    if (!req.query.src || !req.query.take) {
        res.sendStatus(400);
        return;
    }
    
    axios.get(config.hostSpring + '/utils/search', { params: req.query }).then(response => {
        res.json(response.data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})

module.exports = router;