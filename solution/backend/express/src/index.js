const express = require('express')
const axios = require('axios')

const app = express()
const port = 3000

const gameRouter = require('./routes/game');
app.use('/game', gameRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })