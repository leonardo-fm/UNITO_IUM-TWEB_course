const express = require('express');
const { getDb } = require('../db');

var router = express.Router();

router.get('/lineups/:gameId', (req, res) => {
    if (!req.params.gameId) {
        return res.status(400).json({error: "No gameId provided"});
    }

    getDb().collection('game_lineups')
        .find({ game_id: BigInt(req.params.gameId) })
        .sort({ club_id: 1 })
        .toArray()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json({error: "Could not fetch the document"})})
});

router.get('/events/:gameId', function(req, res) {
    if (!req.params.gameId) {
        return res.status(400).json({error: "No gameId provided"});
    }

    getDb().collection('game_events')
        .find({ game_id: BigInt(req.params.gameId) })
        .sort({ minute: -1 })
        .toArray()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json({error: "Could not fetch the document"})})
});

module.exports = router;