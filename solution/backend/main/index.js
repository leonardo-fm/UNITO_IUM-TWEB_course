const express = require('express')
const axios = require('axios')
const cors = require('cors')
const http = require('http');

const hostSpring = 'http://localhost:8082'
const hostExpress = 'http://localhost:3001'
const corsOrigin = 'http://localhost:4200'
const port = 3000;

const app = express()
app.set('port', port);
var server = http.createServer(app);

app.use(cors({
    origin: corsOrigin
}))

const competitionRouter = require('./src/routes/competition');
const gameRouter = require('./src/routes/game');
const playerRouter = require('./src/routes/player');
const clubRouter = require('./src/routes/club');
const chatRouter = require('./src/routes/chat');

app.use('/', competitionRouter);
app.use('/', gameRouter);
app.use('/', playerRouter);
app.use('/', clubRouter);
app.use('/', chatRouter);



// TODO -------------------------------------------



// Save all chat messages every x seconds
const intervalSavingChat = 2;

const chats = {};




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