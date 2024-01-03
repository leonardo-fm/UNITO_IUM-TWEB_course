const express = require('express');
const { connectToDb } = require('./db');

const app = express();
const port = 3000;

app.use(express.json());

const gameRouter = require('./routes/game');
const chatRouter = require('./routes/chat');
const playerRouter = require('./routes/player');

app.use('/game', gameRouter);
app.use('/chat', chatRouter);
app.use('/player', playerRouter);

connectToDb((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log("Express listening on port " + port);
        })
    }
})