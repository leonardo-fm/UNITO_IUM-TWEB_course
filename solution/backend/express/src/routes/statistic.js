const express = require('express');
const { getDb } = require('../db');

var router = express.Router();

/**
 * @openapi
 * /player/{playerId}/marketValue:
 *  get:
 *     tags:
 *     - Statitsic
 *     summary: Get market value of a player
 *     parameters:
 *      - name: playerId
 *        in: path
 *        description: The id of the player
 *        required: true
 *     description: Return the list of market values for a specific player
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/player/:playerId/marketValue', function (req, res) {
    if (!req.params.playerId) {
        return res.status(400).json({ error: "Wrong arguments" });
    }

    getDb().collection('player_valutations')
        .find({ player_id: BigInt(req.params.playerId) })
        .project({ date: 1, market_value_in_eur: 1, _id: 0 })
        .sort({ date: 1 })
        .toArray()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json({error: "Could not fetch the document"})})
});

/**
 * @openapi
 * /player/{playerId}/highlights:
 *  get:
 *     tags:
 *     - Statitsic
 *     summary: Get highlights of a player by year
 *     parameters:
 *      - name: playerId
 *        in: path
 *        description: The id of the player
 *        required: true
 *     description: Return the list of goals, yellow cards and red cards by year for a specific player
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/player/:playerId/highlights', function (req, res) {
    if (!req.params.playerId) {
        return res.status(400).json({ error: "Wrong arguments" });
    }

    getDb().collection('appearances')
        .aggregate([{ "$match": { player_id: BigInt(req.params.playerId) } }])
        .group({
            _id: { year: { "$year": "$date" } },
            totalGoals: { $sum: "$goals" },
            totalAssists: { $sum: "$assists" },
            totalYellowCards: { $sum: "$yellow_cards" },
            totalRedCards: { $sum: "$red_cards" }
        })
        .project({
            _id: 0,
            year: "$_id.year",
            totalGoals: 1,
            totalAssists: 1,
            totalYellowCards: 1,
            totalRedCards: 1
        })
        .sort({ year: 1 })
        .toArray()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json({error: "Could not fetch the document"})})
});

module.exports = router;