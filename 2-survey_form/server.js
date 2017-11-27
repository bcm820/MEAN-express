
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

// survey
app.get('/', (req, res) => {
    res.render('index');
});

// post
app.post('/send', (req, res) => {
    req.session.user = req.body;
    res.redirect('/result');
});

// result
app.get('/result', (req, res) => {
    res.render('result', {user: req.session.user});
});

app.listen(8000);