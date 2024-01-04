var express = require('express');
const { getDb } = require('../db');

var router = express.Router();

/**
 * @openapi
 * /chat/{chatId}:
 *  get:
 *     tags:
 *     - Chat
 *     summary: Get chat
 *     parameters:
 *      - name: chatId
 *        in: path
 *        description: The id of the chat
 *        required: true
 *      - name: take
 *        in: query
 *        description: The ammount of messages to take
 *        required: true
 *      - name: skip
 *        in: query
 *        description: The ammount of messages to skip
 *        required: true
 *     description: Return the list of messages of the chat
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/:chatId', function (req, res) {
    if (!req.params.chatId || !req.query.take || !req.query.skip) {
        return res.status(400).json({ error: "Wrong arguments" });
    }

    let response = [];

    getDb().collection('chat')
        .find({ chatId: req.params.chatId })
        .project({ messages: { $slice: [parseInt(req.query.skip), parseInt(req.query.take)] }, _id: 0 })
        .toArray()
        .then(result => { res.status(200).json(result.length > 0 ? result[0] : []); })
        .catch(err => { res.status(500).json({ error: "Could not fetch the document" }) })
});

/**
 * @openapi
 * /chat/save:
 *  post:
 *     tags:
 *     - Chat
 *     summary: Save a chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - chatId
 *             properties:
 *               chatId:
 *                 type: string
 *                 default: player_65342332
 *     description: Save a chat
 *     responses:
 *       201:
 *         description: Chat saved
 */
router.post('/save', function (req, res) {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "No body" });
    }

    let chatToBeSaved = req.body.length;
    let promises = [];

    req.body.forEach(chat => {
        let messagesOrderedByDate = chat.messages
            .sort((first, second) => { return new Date(second.date) - new Date(first.date) });

        let promise = getDb().collection('chat')
            .updateOne(
                { chatId: chat.chatId },
                { $push: { messages: { $each: messagesOrderedByDate, $position: 0 } } },
                { upsert: true })

            promises.push(promise);
    });

    Promise.all(promises)
        .then(result => { return chatToBeSaved == result.length ? res.sendStatus(201) : res.sendStatus(418); })
        .catch(err => { res.status(500).json({ error: "Could not update the chat" }) })
});

module.exports = router;