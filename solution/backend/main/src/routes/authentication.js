const express = require('express');
const axios = require('axios');
const config = require('../config');

var router = express.Router();

router.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.sendStatus(400);
        return;
    }

    axios.post(config.hostSpring + '/user/login', req.body).then(response => {
        res.json(response.data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.post('/register', (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.sendStatus(400);
        return;
    }

    axios.post(config.hostSpring + '/user/register', req.body).then(response => {
        res.json(response.data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});



module.exports = router;