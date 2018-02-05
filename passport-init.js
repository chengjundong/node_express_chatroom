const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const _ = require('lodash');
const users = require('./data/users.json');

passport.use(new LocalStrategy((username, password, done) => {
    let user = _.find(users, u => u.username === username);

    if(!user || user.password !== password) {
        done(null, false);
        return;
    }

    done(null, user);
}));

passport.serializeUser((user, done) => {
   done(null, user);
});

passport.deserializeUser((user, done) => {
   done(null, user);
});
