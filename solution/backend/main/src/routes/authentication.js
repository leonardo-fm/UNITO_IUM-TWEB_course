const express = require('express');
const axios = require('axios');
const config = require('../config');

var router = express.Router();

/**
 * @openapi
 * /login:
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Authenticate the user
 *     parameters:
 *      - name: username
 *        in: body
 *        description: The username of the user
 *        required: true
 *      - name: password
 *        in: body
 *        description: The password of the user
 *        required: true
 *     responses:
 *       200:
 *         description: Return a boolean indicate if the login has been successful
 */
router.post('/login', (req, res) => {
    console.log(req.body)
    if (!req.body?.username || !req.body?.password) {
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

/**
 * @openapi
 * /register:
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Register a new user
 *     parameters:
 *      - name: username
 *        in: body
 *        description: The username of the user
 *        required: true
 *      - name: password
 *        in: body
 *        description: The password of the user
 *        required: true
 *     responses:
 *       200:
 *         description: Return a boolean indicate if the register has been successful
 */
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