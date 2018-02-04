const express = require('express');
const app = express();
var rooms = require('./data/rooms.json');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const _ = require('lodash');

// change the look-up folder for views
app.set('views', './my-views/');
// set the default view engine to jade
app.set('view engine', 'jade')

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));

// parse x-urlencoded-form
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, resp) => resp.render('index', {title: 'Home'}));

app.get('/admin/rooms',
    (req, resp) => resp.render('rooms', {
        title: 'Admin Rooms',
        rooms: rooms
    }));

app.get('/admin/rooms/add', (req, resp) => resp.render('add'));

app.post('/admin/rooms/create', (req, resp) => {
    var room = {
        name: req.body.name,
        id: uuidv4()
    }
    // save in rooms
    rooms.push(room);
    // send back
    resp.redirect('/admin/rooms');
});

app.get('/admin/rooms/edit/:id', (req, resp) => {
    var roomId = req.params.id;
    var room = _.find(rooms, r => r.id === roomId);
    if(!room) {
        resp.status(404).end();
        return;
    }
    resp.render('edit', {room});
});

app.post('/admin/rooms/edit', (req, resp) => {
    var roomId = req.body.id;
    var room = _.find(rooms, r => r.id === roomId);
    if(!room) {
        resp.status(404).end();
        return;
    }
    room.name = req.body.name;
    // send back
    resp.redirect('/admin/rooms');
});

app.get('/admin/rooms/delete/:id', (req, resp) => {
    var roomId = req.params.id;
    rooms = rooms.filter(r => r.id !== roomId);
    resp.redirect('/admin/rooms');
});

app.listen(8080, () => {
    console.log('server starts at 8080...');
});