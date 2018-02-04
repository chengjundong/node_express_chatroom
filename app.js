const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// change the look-up folder for views
app.set('views', './my-views/');
// set the default view engine to jade
app.set('view engine', 'jade')

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/jquery/dist'));

require('express-debug')(app, {});

// parse x-urlencoded-form, must be put above any routers
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, resp) => resp.render('home', {title: 'Home'}));

// import admin router
const adminRouter = require('./admin');
app.use('/admin', adminRouter);

// import api router
const apiRouter = require('./api');
app.use('/api', apiRouter);

app.listen(8080, () => {
    console.log('server starts at 8080...');
});