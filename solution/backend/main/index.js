const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Hosting static browser files
app.use('/browser', express.static(__dirname + '/static/browser'));
// For working angular routing on refresh, need to redirect all requests to index.html 
app.get('/browser/*', (req, res) => {
    res.sendFile(__dirname + '/static/browser/index.html');
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
