const config = require('../src/config');
const axios = require('axios');

exports.init = function (io) {
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('message', (roomId, msg) => {
            console.log('chat message to ', roomId, msg);
            (config.chats[roomId] = config.chats[roomId] || []).push(msg);
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
}

let currentInterval = config.intervalSavingChat;
(function variableInterval() {
    setTimeout(async () => {
        await saveAllChats();
        console.log('Next interval: ', currentInterval);
        variableInterval();
    }, currentInterval * 1000);
})();

async function saveAllChats() {
    let chatsId = Object.keys(config.chats);
    let body = chatsId.map(x => {
        return {
            chatId: x,
            messages: config.chats[x]
        }
    });

    if (body.length == 0){
        increaseInterval();
        return;
    }

    await axios.post(config.hostExpress + '/chat/save', body).then(response => {
        console.log('Message chats saved');
        chatsId.forEach(x => delete config.chats[x]);
        currentInterval = config.intervalSavingChat;
    }).catch(err => {
        console.log('Error on saving chats', err);
        increaseInterval();
    });
}

function increaseInterval(){
    if (currentInterval < config.maxInterval)
        currentInterval *= 2;
}