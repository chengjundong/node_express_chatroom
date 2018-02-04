'use strict'

const express = require('express');
const _ = require('lodash');
var rooms = require('./data/rooms.json');
var messages = require('./data/messages');
const uuidv4 = require('uuid/v4');

const router = express.Router();
module.exports = router;

router.get('/rooms', (req, res) => {
    res.json(rooms);
});

router.route('/rooms/:roomId/messages')
    .all((req, res, next) => {
        let roomId = req.params.roomId;

        let room = _.find(rooms, r => r.id === roomId);
        if (!room) {
            next("Oops, no room found!")
        }

        res.locals.room = room;

        next();
    })
    .get((req, res) => {
        let roomId = req.params.roomId;
        // filter message by room id
        let roomMessages = messages.filter(m => m.roomId === roomId);

        res.json({
            room: res.locals.room,
            messages: roomMessages
        });
    })
    .post((req, res) => {
        let roomId = req.params.roomId;
        let newMessage = {
            text: req.body.text,
            roomId: roomId,
            userId: '44f885e8-87e9-4911-973c-4074188f408a',
            id: uuidv4()
        };

        messages.push(newMessage);
        res.sendStatus(201);
    })
    .delete((req, res) => {
        let roomId = req.params.roomId;
        messages = messages.filter(m => m.roomId !== roomId);
        res.sendStatus(204);
    });