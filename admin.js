const uuidv4 = require('uuid/v4');
const _ = require('lodash');
var rooms = require('./data/rooms.json');

const router = require('express').Router();
module.exports = router;

router.get('/rooms',
    (req, resp) => resp.render('rooms', {
        title: 'Admin Rooms',
        rooms: rooms
    }));

router.get('/rooms/add', (req, resp) => resp.render('add'));

router.post('/rooms/create', (req, resp) => {
    var room = {
        name: req.body.name,
        id: uuidv4()
    }
    // save in rooms
    rooms.push(room);
    // send back
    resp.redirect(req.baseUrl + '/rooms');
});


router.route('/rooms/edit/:id')
    .all((req, resp, next) => {
        var roomId = req.params.id;
        var room = _.find(rooms, r => r.id === roomId);
        if (!room) {
            next(new Error('oops'));
        }
        resp.locals.room = room;
        next();
    })
    .get((req, resp) => {
        resp.render('edit');
    })
    .post((req, resp) => {
        resp.locals.room.name = req.body.name;
        // send back
        resp.redirect(req.baseUrl + '/rooms');
    });

router.get('/rooms/delete/:id', (req, resp) => {
    var roomId = req.params.id;
    rooms = rooms.filter(r => r.id !== roomId);
    resp.redirect(req.baseUrl + '/rooms');
});