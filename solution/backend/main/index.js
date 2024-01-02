const express = require('express')
const axios = require('axios')
var cors = require('cors')

const app = express()
const port = 3000
const hostSpring = 'http://localhost:8082'

app.use(cors({
  origin: '*'
}))

app.get('/getAllCompetition', (req, res) => {
  axios.get(hostSpring + '/competition/all').then(response => {
    res.json(response.data);
  });
});

app.get('/getGameHistory', (req, res) => {
  if (!req.query.take || !req.query.offset) {
    res.sendStatus(403);
    return;
  }

  axios.get(hostSpring + '/game', { params: req.query }).then(response => {
    res.json(response.data);
  });
});

app.get('/getCompetitionById', (req, res) => {
  if (!req.query.competitionId) {
    res.sendStatus(403);
    return;
  }
  axios.get(hostSpring + '/competition/' + req.query.competitionId).then(response => {
    res.json(response.data);
  })
})

app.get('/getCompetitionStats', (req, res) => {
  if (!req.query.competitionId || !req.query.season) {
    res.sendStatus(403);
    return;
  }
  if (isNaN(req.query.season)) {
    res.sendStatus(403);
    return;
  }

  axios.get(hostSpring + '/club/competition/' + req.query.competitionId + '/' + req.query.season).then(response => {
    res.json(response.data);
  })
})

app.get('/getCompetitionGameHistory', (req, res) => {
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
  })
})

app.get('/getGameById', (req, res) => {
  if (!req.query.gameId) {
    res.sendStatus(403);
    return;
  }
  axios.get(hostSpring + '/game/' + req.query.gameId).then(response => {
    res.json(response.data);
  })
})

app.get('/getPlayerById', (req, res) => {
  if (!req.query.playerId) {
    res.sendStatus(403);
    return;
  }
  axios.get(hostSpring + '/player/' + req.query.playerId).then(response => {
    res.json(response.data);
  })
})

app.get('/getPlayersByClub', (req, res) => {
  if (!req.query.clubId) {
    res.sendStatus(403);
    return;
  }
  axios.get(hostSpring + '/player/club/' + req.query.clubId).then(response => {
    res.json(response.data);
  })
})

app.get('/getPlayerGameHistory', (req, res) => {
  if (!req.query.playerId) {
    res.sendStatus(403);
    return;
  }
  axios.get(hostSpring + '/game/player/').then(response => {
    res.json(response.data);
  })
}) 

app.get('/getClubById', (req, res) => {
  if (!req.query.clubId) {
    res.sendStatus(403);
    return;
  }
  axios.get(hostSpring + '/club/' + req.query.clubId).then(response => {
    res.json(response.data);
  })
})

app.get('/getClubGameHistory', (req, res) => {
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
  })
})

// Hosting static browser files
app.use('/browser', express.static(__dirname + '/static/browser'));
// For working angular routing on refresh, need to redirect all requests to index.html 
app.get('/browser/*', (req, res) => {
  res.sendFile(__dirname + '/static/browser/index.html');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
