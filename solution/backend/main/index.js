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
  console.log(req.query)
  if (!req.query.take || !req.query.offset){
    res.sendStatus(403);
  }

  axios.get(hostSpring + '/game', { params: req.query }).then(response => {
    res.json(response.data);
  });
});

// Hosting static browser files
app.use('/browser', express.static(__dirname + '/static/browser'));
// For working angular routing on refresh, need to redirect all requests to index.html 
app.get('/browser/*', (req, res) => {
  res.sendFile(__dirname + '/static/browser/index.html');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
