const express = require('express');
const axios = require('axios')

var router = express.Router();

const hostSpring = 'http://localhost:8082'
const hostExpress = 'http://localhost:3001'

router.get('/getGameById', (req, res) => {
    if (!req.query.gameId) {
        res.sendStatus(403);
        return;
    }
    axios.get(hostSpring + '/game/' + req.query.gameId).then(response => {
        res.json(response.data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})

router.get('/getGameDetail', (req, res) => {
    if (!req.query.gameId) {
        res.sendStatus(403);
        return;
    }

    Promise.all([
        axios.get(hostExpress + '/game/events/' + req.query.gameId),
        axios.get(hostExpress + '/game/lineups/' + req.query.gameId)
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

router.get('/getGameHistory', (req, res) => {
    if (!req.query.take || !req.query.offset) {
        res.sendStatus(403);
        return;
    }

    axios.get(hostSpring + '/game', { params: req.query }).then(response => {
        res.json(response.data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

module.exports = router;