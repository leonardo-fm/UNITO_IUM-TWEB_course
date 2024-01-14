const express = require('express');
const axios = require('axios');
const config = require('../config');

var router = express.Router();

/**
 * @openapi
 * /getChatMessages?chatId&take&skip:
 *  get:
 *     tags:
 *     - Chat
 *     summary: Get the chat messages
 *     parameters:
 *      - name: chatId
 *        in: query
 *        description: The id of the chat
 *        required: true
 *      - name: take
 *        in: query
 *        description: The ammount of messages id to take
 *        required: true
 *      - name: skip
 *        in: query
 *        description: The ammount of messages id to skip
 *        required: true
 *     description: Return the list of messages of a chat
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/getChatMessages', (req, res) => {
    if (!req.query.chatId || !req.query.take || !req.query.offset) {
        res.sendStatus(403);
        return;
    }

    axios.get(config.hostExpress + '/chat/' + req.query.chatId, {
        params: {
            take: req.query.take,
            skip: req.query.offset
        }
    }).then(response => {
        let messages = response.data.messages || [];
        messages.reverse();
        if (config.chats[req.query.chatId])
            messages.push(...config.chats[req.query.chatId]);
        res.json(messages);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

module.exports = router;