const express = require('express');
const axios = require('axios');
const config = require('../config');

var router = express.Router();

/**
 * @openapi
 * /getPlayerById?playerId:
 *  get:
 *     tags:
 *     - Player
 *     summary: Get player by id
 *     parameters:
 *      - name: playerId
 *        in: query
 *        description: The id of the player
 *        required: true
 *     description: Return the player
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/getPlayerById', (req, res) => {
    if (!req.query.playerId) {
        res.sendStatus(403);
        return;
    }
    axios.get(config.hostSpring + '/player/' + req.query.playerId).then(response => {
        res.json(response.data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})

/**
 * @openapi
 * /getPlayersByClub?clubId:
 *  get:
 *     tags:
 *     - Player
 *     summary: Get player by club
 *     parameters:
 *      - name: clubId
 *        in: query
 *        description: The id of the club
 *        required: true
 *     description: Return the list of player in a club
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/getPlayersByClub', (req, res) => {
    if (!req.query.clubId) {
        res.sendStatus(403);
        return;
    }
    axios.get(config.hostSpring + '/player/club/' + req.query.clubId).then(response => {
        res.json(response.data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})

/**
 * @openapi
 * /getPlayerGameHistory?playerId&take&skip:
 *  get:
 *     tags:
 *     - Player
 *     summary: Get games played by a player
 *     parameters:
 *      - name: playerId
 *        in: query
 *        description: The id of the player
 *        required: true
 *      - name: take
 *        in: query
 *        description: The ammount of games id to take
 *        required: true
 *      - name: skip
 *        in: query
 *        description: The ammount of games id to skip
 *        required: true
 *     description: Return the list of games id where the player had played
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/getPlayerGameHistory', (req, res) => {
    if (!req.query.playerId || !req.query.take || !req.query.offset) {
        res.sendStatus(403);
        return;
    }

    axios.get(config.hostExpress + '/player/games/' + req.query.playerId, {
        params: {
            take: req.query.take,
            skip: req.query.offset
        }
    }).then(response => {
        let gameIds = response.data.map(x => x.game_id);
        axios.post(config.hostSpring + '/game/player', gameIds).then(response => {
            res.json(response.data);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})

/**
 * @openapi
 * /getPlayerMarketValue?playerId:
 *  get:
 *     tags:
 *     - Player
 *     summary: Get player market value
 *     parameters:
 *      - name: playerId
 *        in: query
 *        description: The id of the player
 *        required: true
 *     description: Return the list of market value
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/getPlayerMarketValue', (req, res) => {
    if (!req.query.playerId) {
        res.sendStatus(403);
        return;
    }
    axios.get(config.hostExpress + '/statistic/player/' + req.query.playerId + '/marketValue').then(response => {
        res.json(response.data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})

/**
 * @openapi
 * /getPlayerHighlights?playerId:
 *  get:
 *     tags:
 *     - Player
 *     summary: Get player highlights
 *     parameters:
 *      - name: playerId
 *        in: query
 *        description: The id of the player
 *        required: true
 *     description: Return the list of highlights
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/getPlayerHighlights', (req, res) => {
    if (!req.query.playerId) {
        res.sendStatus(403);
        return;
    }
    axios.get(config.hostExpress + '/statistic/player/' + req.query.playerId + '/highlights').then(response => {
        res.json(response.data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})

module.exports = router;