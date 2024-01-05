const express = require('express');
const axios = require('axios');
const config = require('../config');

var router = express.Router();

/**
 * @openapi
 * /getClubById?clubId:
 *  get:
 *     tags:
 *     - Club
 *     summary: Get club by id
 *     parameters:
 *      - name: clubId
 *        in: query
 *        description: The id of the club
 *        required: true
 *     description: Return the club
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/getClubById', (req, res) => {
    if (!req.query.clubId) {
        res.sendStatus(403);
        return;
    }
    axios.get(config.hostSpring + '/club/' + req.query.clubId).then(response => {
        res.json(response.data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})

/**
 * @openapi
 * /getClubGameHistory?clubId&season&take&skip:
 *  get:
 *     tags:
 *     - Club
 *     summary: Get games played by a club
 *     parameters:
 *      - name: clubId
 *        in: query
 *        description: The id of the club
 *        required: true
 *      - name: season
 *        in: query
 *        description: The season
 *        required: true
 *      - name: take
 *        in: query
 *        description: The ammount of games id to take
 *        required: true
 *      - name: skip
 *        in: query
 *        description: The ammount of games id to skip
 *        required: true
 *     description: Return the list of games played by a club
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/getClubGameHistory', (req, res) => {
    if (!req.query.clubId || !req.query.season || !req.query.take || !req.query.offset) {
        res.sendStatus(403);
        return;
    }
    if (isNaN(req.query.season)) {
        res.sendStatus(403);
        return;
    }

    axios.get(config.hostSpring + '/game/club/' + req.query.clubId + '/' + req.query.season, {
        params: {
            take: req.query.take,
            offset: req.query.offset
        }
    }).then(response => {
        res.json(response.data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})

module.exports = router;