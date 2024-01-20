const express = require('express');
const { connectToDb } = require('./db');
const { swaggerDocs } = require('./swagger');

const app = express();
const port = 3001;
app.use(express.json());

const gameRouter = require('./routes/game');
const chatRouter = require('./routes/chat');
const playerRouter = require('./routes/player');
const statisticRouter = require('./routes/statistic');

app.use('/game', gameRouter);
app.use('/chat', chatRouter);
app.use('/player', playerRouter);
app.use('/statistic', statisticRouter);

connectToDb((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log("Express listening on port " + port);
            swaggerDocs(app, port);
        })
    }
})