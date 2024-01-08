const express = require('express')
const cors = require('cors')
const http = require('http');
const { swaggerDocs } = require('./src/swagger');
const config = require('./src/config');

const app = express()
app.set('port', config.port);
var server = http.createServer(app);

app.use(cors({
    origin: config.corsOrigin
}))

const competitionRouter = require('./src/routes/competition');
const gameRouter = require('./src/routes/game');
const playerRouter = require('./src/routes/player');
const clubRouter = require('./src/routes/club');
const chatRouter = require('./src/routes/chat');
const authenticationRouter = require('./src/routes/authentication');
const utilsRouter = require('./src/routes/utils');

app.use('/', competitionRouter);
app.use('/', gameRouter);
app.use('/', playerRouter);
app.use('/', clubRouter);
app.use('/', chatRouter);
app.use('/', authenticationRouter);

// Hosting static browser files
app.use('/browser', express.static(__dirname + '/static/browser'));

// For working angular routing on refresh, need to redirect all requests to index.html 
app.get('/browser/*', (req, res) => {
  res.sendFile(__dirname + '/static/browser/index.html');
});

server.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
  swaggerDocs(app, config.port);
});


const socketIO = require('socket.io');
const io = socketIO(server, {
    cors: {
        origin: config.corsOrigin,
    }
});
const socket_module = require('./src/socket-io')
socket_module.init(io);