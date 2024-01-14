const express = require('express');
const axios = require('axios');
const config = require('../config');

var router = express.Router();

/**
 * @openapi
 * /siteSearch?src&take:
 *  get:
 *     tags:
 *     - Utils
 *     summary: Return a global search
 *     parameters:
 *      - name: src
 *        in: query
 *        description: The string to be searched
 *        required: true
 *      - name: take
 *        in: query
 *        description: The ammount of results to take
 *        required: true
 *     description: A search that look for Players, Competitions and Clubs name
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/siteSearch', (req, res) => {
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