const express = require('express');
const { getDb } = require('../db');

var router = express.Router();

router.get('/games/:playerId', (req, res) => {
    if (!req.params.playerId || !req.query.take || !req.query.skip) {
        return res.status(400).json({error: "Wrong arguments"});
    }

    getDb().collection('game_lineups')
        .find({ player_id: BigInt(req.params.playerId) })
        .sort({ game_id: -1 })
        .project({ game_id: 1, _id: 0 })
        .skip(parseInt(req.query.skip))
        .limit(parseInt(req.query.take))
        .toArray()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json({error: "Could not fetch the document"})})
});

module.exports = router;