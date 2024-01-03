const express = require('express')
const { connectToDb } = require('./db');

const app = express()
const port = 3000

const gameRouter = require('./routes/game');
const chatRouter = require('./routes/chat');

app.use('/game', gameRouter);
app.use('/chat', chatRouter);

connectToDb((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log("Express listening on port " + port)
        })
    }
})