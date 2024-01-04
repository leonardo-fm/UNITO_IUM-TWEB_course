const express = require('express');
const axios = require('axios')

var router = express.Router();

const hostSpring = 'http://localhost:8082'

router.get('/getCompetitionById', (req, res) => {
    if (!req.query.competitionId) {
        res.sendStatus(403);
        return;
    }
    axios.get(hostSpring + '/competition/' + req.query.competitionId).then(response => {
        res.json(response.data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})

router.get('/getAllCompetition', (req, res) => {
    axios.get(hostSpring + '/competition/all').then(response => {
        res.json(response.data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get('/getCompetitionStats', (req, res) => {
    if (!req.query.competitionId || !req.query.season) {
        res.sendStatus(403);
        return;
    }
    if (isNaN(req.query.season)) {
        res.sendStatus(403);
        return;
    }

    axios.get(hostSpring + '/club/competition/' + req.query.competitionId + '/' + req.query.season)
        .then(response => {
            res.json(response.data);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
})

router.get('/getCompetitionGameHistory', (req, res) => {
    if (!req.query.competitionId || !req.query.season || !req.query.take || !req.query.offset) {
        res.sendStatus(403);
        return;
    }
    if (isNaN(req.query.season)) {
        res.sendStatus(403);
        return;
    }

    axios.get(hostSpring + '/game/competition/' + req.query.competitionId + '/' + req.query.season, {
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