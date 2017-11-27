
const mods = '../../node_modules';
const express = require(`${mods}/express`);
const app = express();
const bp = require(`${mods}/body-parser`);
const session = require(`${mods}/express-session`);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
app.use(bp.urlencoded({extended: true}));
app.use(session({
    secret: 'thisIsASecret',
    resave: false,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    if(req.session.counter){ req.session.counter += 1; }
    else { req.session.counter = 1; }
    res.render('index', {counter: req.session.counter});
});

app.post('/mult', (req, res) => {
    req.session.counter += 1;
    res.redirect('/');
});

app.post('/reset', (req, res) => {
    req.session.counter = null;
    res.redirect('/');
});

app.listen(8000);