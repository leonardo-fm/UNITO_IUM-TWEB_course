const express = require('express');
const { getDb } = require('../db');

var router = express.Router();

router.get('/lineups/:gameId', (req, res) => {
    if (!req.params.gameId) {
        return res.status(401).json({error: "No gameId provided"});
    }

    let response = [];

    getDb().collection('game_lineups')
        .find({ game_id: BigInt(req.params.gameId) })
        .sort({ club_id: 1 })
        .forEach(lineup => response.push(lineup))
        .then(() => { res.status(200).json(response); })
        .catch(() => { res.status(500).json({error: "Could not fetch the document"})})
});

router.get('/events/:gameId', function(req, res) {
    if (!req.params.gameId) {
        return res.status(401).json({error: "No gameId provided"});
    }

    let response = [];

    getDb().collection('game_events')
        .find({ game_id: BigInt(req.params.gameId) })
        .sort({ minute: -1 })
        .forEach(gameEvent => response.push(gameEvent))
        .then(() => { res.status(200).json(response); })
        .catch(() => { res.status(500).json({error: "Could not fetch the document"})})
});

module.exports = router;