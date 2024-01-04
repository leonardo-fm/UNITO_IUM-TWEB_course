const express = require('express');
const axios = require('axios')

var router = express.Router();

const hostExpress = 'http://localhost:3001'

router.get('/getChatMessages', (req, res) => {
    if (!req.query.chatId || !req.query.take || !req.query.offset) {
        res.sendStatus(403);
        return;
    }

    axios.get(hostExpress + '/chat/' + req.query.chatId, {
        params: {
            take: req.query.take,
            skip: req.query.offset
        }
    }).then(response => {
        let messages = response.data.messages || [];
        if (chats[req.query.chatId])
            messages.push(...chats[req.query.chatId]);
        res.json(messages);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

module.exports = router;