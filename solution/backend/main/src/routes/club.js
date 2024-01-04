const express = require('express');
const axios = require('axios')

var router = express.Router();

const hostSpring = 'http://localhost:8082'

router.get('/getClubById', (req, res) => {
    if (!req.query.clubId) {
        res.sendStatus(403);
        return;
    }
    axios.get(hostSpring + '/club/' + req.query.clubId).then(response => {
        res.json(response.data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})

router.get('/getClubGameHistory', (req, res) => {
    if (!req.query.clubId || !req.query.season || !req.query.take || !req.query.offset) {
        res.sendStatus(403);
        return;
    }
    if (isNaN(req.query.season)) {
        res.sendStatus(403);
        return;
    }

    axios.get(hostSpring + '/game/club/' + req.query.clubId + '/' + req.query.season, {
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