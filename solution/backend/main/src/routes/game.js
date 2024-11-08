const express = require('express');
const axios = require('axios');
const config = require('../config');

var router = express.Router();

/**
 * @openapi
 * /getGameById?gameId:
 *  get:
 *     tags:
 *     - Game
 *     summary: Get game by id
 *     parameters:
 *      - name: gameId
 *        in: query
 *        description: The id of the game
 *        required: true
 *     description: Return the game
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/getGameById', (req, res) => {
    if (!req.query.gameId) {
        res.sendStatus(403);
        return;
    }
    axios.get(config.hostSpring + '/game/' + req.query.gameId).then(response => {
        res.json(response.data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})

/**
 * @openapi
 * /getGameDetail?gameId:
 *  get:
 *     tags:
 *     - Game
 *     summary: Get game details by id
 *     parameters:
 *      - name: gameId
 *        in: query
 *        description: The id of the game
 *        required: true
 *     description: Return the game details
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/getGameDetail', (req, res) => {
    if (!req.query.gameId) {
        res.sendStatus(403);
        return;
    }

    Promise.all([
        axios.get(config.hostExpress + '/game/events/' + req.query.gameId),
        axios.get(config.hostExpress + '/game/lineups/' + req.query.gameId)
    ]).then(([response1, response2]) => {
        res.json({
            events: response1.data,
            lineups: response2.data
        });
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})

/**
 * @openapi
 * /getGameHistory?take&offset:
 *  get:
 *     tags:
 *     - Game
 *     summary: Get games list
 *     parameters:
 *      - name: take
 *        in: query
 *        description: The ammount of games id to take
 *        required: true
 *      - name: offset
 *        in: query
 *        description: The ammount of games id to skip
 *        required: true
 *      - name: date
 *        in: query
 *        description: The date from when get data
 *        required: true
 *     description: Return the games list
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/getGameHistory', (req, res) => {
    if (!req.query.take || !req.query.offset || !req.query.date) {
        res.sendStatus(403);
        return;
    }

    axios.get(config.hostSpring + '/game', { params: req.query }).then(response => {
        res.json(response.data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

module.exports = router;