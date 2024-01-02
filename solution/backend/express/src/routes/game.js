var express = require('express');
var router = express.Router();

router.get('/lineups', function(req, res) {
    if (!req.query.gameId) {
        return res.sendStatus(404);
    }

    let gameId = req.query.gameId;
    let response = getLineupsForGame(gameId);
    res.json(response);
});

function getLineupsForGame(gameId) {
    return "Hi!";
}

router.get('/events', function(req, res) {
    if (!req.query.gameId) {
        return res.sendStatus(404);
    }

    let gameId = req.query.gameId;
    let response = getEventsForGame(gameId);
    res.json(response);
});

function getEventsForGame(gameId) {
    return "Hi event!";
}

module.exports = router;