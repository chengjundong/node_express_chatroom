const passport = require('passport');
const express = require('express');

const router = express.Router();
module.exports = router;

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));