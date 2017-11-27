
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

// index
app.get('/', (req, res) => {

    if(!req.session.n){
        req.session.n = Math.floor(Math.random() * (100 - 1)) + 1;
        req.session.g = 0;
    }
    let nums = { n: req.session.n, g: req.session.g };
    res.render('index', {nums: nums});
});

// guess
app.post('/guess', (req, res) => {
    req.session.g = req.body.g;
    res.redirect('/');
});

// reset
app.post('/reset', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(8000);