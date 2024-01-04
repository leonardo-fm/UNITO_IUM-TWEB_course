const express = require('express');
const axios = require('axios')

var router = express.Router();

const hostSpring = 'http://localhost:8082'
const hostExpress = 'http://localhost:3001'

router.get('/getPlayerById', (req, res) => {
    if (!req.query.playerId) {
        res.sendStatus(403);
        return;
    }
    axios.get(hostSpring + '/player/' + req.query.playerId).then(response => {
        res.json(response.data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})

router.get('/getPlayersByClub', (req, res) => {
    if (!req.query.clubId) {
        res.sendStatus(403);
        return;
    }
    axios.get(hostSpring + '/player/club/' + req.query.clubId).then(response => {
        res.json(response.data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})

router.get('/getPlayerGameHistory', (req, res) => {
    if (!req.query.playerId || !req.query.take || !req.query.offset) {
        res.sendStatus(403);
        return;
    }

    axios.get(hostExpress + '/player/games/' + req.query.playerId, {
        params: {
            take: req.query.take,
            skip: req.query.offset
        }
    }).then(response => {
        let gameIds = response.data.map(x => x.game_id);
        axios.post(hostSpring + '/game/player', gameIds).then(response => {
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

module.exports = router;