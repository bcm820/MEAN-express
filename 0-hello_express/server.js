
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

// root route
app.get('/', (req, res) => {
    const users_array = [
        {name: "Michael", email: "michael@codingdojo.com"}, 
        {name: "Jay", email: "jay@codingdojo.com"}, 
        {name: "Brendan", email: "brendan@codingdojo.com"}, 
        {name: "Andrew", email: "andrew@codingdojo.com"}
    ];
    if(req.session.email){ console.log(req.session.email); }
    res.render('index', {users: users_array});

});

// post route
app.post('/users', (req, res) => {
    console.log(req.body); // returns JSON object!
    req.session.email = req.body.email;
    res.redirect('/');
});

// path variable route via URL
app.get('/users/:id', (req, res) => {
    console.log(req.params.id);
    // prints 'id'... can send to DB via res.send(req.params.id);
    res.redirect('/');
});

app.listen(8000);