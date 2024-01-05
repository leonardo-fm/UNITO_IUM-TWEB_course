const express = require('express');
const axios = require('axios');
const config = require('../config');

var router = express.Router();

/**
 * @openapi
 * /getCompetitionById?competitionId:
 *  get:
 *     tags:
 *     - Competition
 *     summary: Get competition by id
 *     parameters:
 *      - name: competitionId
 *        in: query
 *        description: The id of the competition
 *        required: true
 *     description: Return the competition
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/getCompetitionById', (req, res) => {
    if (!req.query.competitionId) {
        res.sendStatus(403);
        return;
    }
    axios.get(config.hostSpring + '/competition/' + req.query.competitionId).then(response => {
        res.json(response.data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})

/**
 * @openapi
 * /getAllCompetition:
 *  get:
 *     tags:
 *     - Competition
 *     summary: Get all the competitions
 *     description: Return all the competition
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/getAllCompetition', (req, res) => {
    axios.get(config.hostSpring + '/competition/all').then(response => {
        res.json(response.data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

/**
 * @openapi
 * /getCompetitionStats?competitionId&season:
 *  get:
 *     tags:
 *     - Competition
 *     summary: Get competition details by id and season
 *     parameters:
 *      - name: competitionId
 *        in: query
 *        description: The id of the competition
 *        required: true
 *      - name: season
 *        in: query
 *        description: The season of the competition
 *        required: true
 *     description: Return the competition details
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/getCompetitionStats', (req, res) => {
    if (!req.query.competitionId || !req.query.season) {
        res.sendStatus(403);
        return;
    }
    if (isNaN(req.query.season)) {
        res.sendStatus(403);
        return;
    }

    axios.get(config.hostSpring + '/club/competition/' + req.query.competitionId + '/' + req.query.season)
        .then(response => {
            res.json(response.data);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
})

/**
 * @openapi
 * /getCompetitionGameHistory?competitionId&season&take&skip:
 *  get:
 *     tags:
 *     - Competition
 *     summary: Get games played in a competition
 *     parameters:
 *      - name: competitionId
 *        in: query
 *        description: The id of the competetion
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
 *     description: Return the list of games played in a competition
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/getCompetitionGameHistory', (req, res) => {
    if (!req.query.competitionId || !req.query.season || !req.query.take || !req.query.offset) {
        res.sendStatus(403);
        return;
    }
    if (isNaN(req.query.season)) {
        res.sendStatus(403);
        return;
    }

    axios.get(config.hostSpring + '/game/competition/' + req.query.competitionId + '/' + req.query.season, {
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