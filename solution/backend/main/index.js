const express = require('express')
const axios = require('axios')
const cors = require('cors')
const http = require('http');

const hostSpring = 'http://localhost:8082'
const corsOrigin = 'http://localhost:4200'
const port = 3000

const app = express()
app.set('port', port);
var server = http.createServer(app);

app.use(cors({
  origin: corsOrigin
}))

app.get('/getAllCompetition', (req, res) => {
  axios.get(hostSpring + '/competition/all').then(response => {
    res.json(response.data);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});

app.get('/getGameHistory', (req, res) => {
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

app.get('/getCompetitionById', (req, res) => {
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
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
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
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
})

app.get('/getGameById', (req, res) => {
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

app.get('/getPlayerById', (req, res) => {
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

app.get('/getPlayersByClub', (req, res) => {
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

app.get('/getPlayerGameHistory', (req, res) => {
  if (!req.query.playerId) {
    res.sendStatus(403);
    return;
  }
  axios.get(hostSpring + '/game/player').then(response => {
    res.json(response.data);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
})

app.get('/getClubById', (req, res) => {
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
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
})

// Hosting static browser files
app.use('/browser', express.static(__dirname + '/static/browser'));
// For working angular routing on refresh, need to redirect all requests to index.html 
app.get('/browser/*', (req, res) => {
  res.sendFile(__dirname + '/static/browser/index.html');
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

const socketIO = require('socket.io');
const io = socketIO(server, {
  cors: {
    origin: corsOrigin,
  }
});
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (roomType, roomId, msg) => {
    console.log('chat message to ', roomType+roomId, msg);
    socket.to(roomType+roomId).emit('message', msg);
  });
  socket.on('join room', (roomType, roomId) => {
    socket.join(roomType+roomId);
    console.log('join room', roomType, roomId);
  });

  socket.on('leave conversation', (name) => {
    console.log('leave conversation', name);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});