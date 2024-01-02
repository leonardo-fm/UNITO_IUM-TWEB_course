var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if (!req.query.chatId) {
        return res.sendStatus(404);
    }

    let chatId = req.query.chatId;
    let response = getChat(chatId);
    res.json(response);
});

function getChat(chatId) {
    return "Chat!";
}

router.post('/save', function(req, res) {
    let response = saveChat(res.data);
    res.json(response);
});

function saveChat(chatId) {
    return "Chat saved!";
}

module.exports = router;