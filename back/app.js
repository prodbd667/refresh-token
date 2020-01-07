const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cors = require('cors');
const logger = require('morgan');
const express = require('express');

const app = express();

const refreshTokens = {};
const SECRET = 'VERY_SECRET_KEY';

const passportOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(logger('dev'));

passport.use(new JwtStrategy(passportOpts, (jwtPayload, done) => {
    const expirationDate = new Date(jwtPayload.exp * 1000);

    if (expirationDate < new Date()) {
        return done(null, false);
    }
    done(null, jwtPayload);
}));

passport.serializeUser((user, done) => {
    done(null, user.username);
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    const user = {
        username,
        role: 'admin'
    };
    const token = jwt.sign(user, SECRET, {expiresIn: 30});
    const refreshToken = randtoken.uid(256);
    refreshTokens[refreshToken] = username;
    res.json({jwt: token, refreshToken: refreshToken});
});

app.post('/logout', (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken in refreshTokens) {
        delete refreshTokens[refreshToken];
    }
    res.sendStatus(204);
});

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (refreshToken in refreshTokens) {
        const user = {
            username: refreshTokens[refreshToken],
            role: 'admin'
        };
        const token = jwt.sign(user, SECRET, {expiresIn: 30});
        res.json({jwt: token});
    } else {
        res.sendStatus(401);
    }
});

app.get('/random', passport.authenticate('jwt'), (req, res) => {
    res.json({value: Math.floor(Math.random() * 100)});
});

app.listen(8080);
