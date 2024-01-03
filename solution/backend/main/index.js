const express = require('express')
const axios = require('axios')
const cors = require('cors')
const http = require('http');

const hostSpring = 'http://localhost:8082'
const hostExpress = 'http://localhost:3001'
const corsOrigin = 'http://localhost:4200'
const port = 3000;

// Save all chat messages every x seconds
const intervalSavingChat = 2;

const chats = {};

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

app.get('/getGameDetail', (req, res) => {
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

app.get('/getChatMessages', (req, res) => {
  if (!req.query.chatId || !req.query.take || !req.query.offset) {
    res.sendStatus(403);
    return;
  }

  axios.get(hostExpress + '/chat/' + req.query.chatId, {
    params: {
      take: req.query.take,
      skip: req.query.offset
    }
  }).then(response => {
    let messages = response.data.messages || [];
    if (chats[req.query.chatId])
      messages.push(...chats[req.query.chatId]);
    res.json(messages);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});

// Hosting static browser files
app.use('/browser', express.static(__dirname + '/static/browser'));
// For working angular routing on refresh, need to redirect all requests to index.html 
app.get('/browser/*', (req, res) => {
  res.sendFile(__dirname + '/static/browser/index.html');
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

setInterval(() => {
  let chatsId = Object.keys(chats);
  let body = chatsId.map(x => {
    return {
      chatId: x,
      messages: chats[x]
    }
  });

  if (body.length == 0)
    return;

  axios.post(hostExpress + '/chat/save', body).then(response => {
    chatsId.forEach(x => delete chats[x]);
  }).catch(err => {
    console.log(err);
  });

}, intervalSavingChat * 1000)

const socketIO = require('socket.io');
const io = socketIO(server, {
  cors: {
    origin: corsOrigin,
  }
});
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (roomId, msg) => {
    console.log('chat message to ', roomId, msg);
    (chats[roomId] = chats[roomId] || []).push(msg);
    socket.to(roomId).emit('message', msg);
  });

  socket.on('join room', (roomId) => {
    socket.join(roomId);
    let roomSize = io.sockets.adapter.rooms.get(roomId).size;
    io.to(roomId).emit('room size', roomSize);
    console.log('join room', roomId, 'SIZE: ', roomSize);
  });

  socket.on('disconnecting', () => {
    console.log('disconnecting');
    // skip the first room (is the unique socket)
    let rooms = [...socket.rooms].slice(1);
    console.log(rooms);
    for (let roomId of rooms) {
      // -1 because this socket is still in room
      let roomSize = io.sockets.adapter.rooms.get(roomId).size - 1;
      console.log('leave room', roomId, 'SIZE: ', roomSize)
      socket.to(roomId).emit('room size', roomSize);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});