const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser')
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

// Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Passport Config routes
require('./config/passport')(passport);

// DB config
const db = require('./config/database');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to moongose
mongoose.connect(db.mongoURI, {
    useMongoClient: true
}).then(() =>{
    console.log('MongoDB Connected');
}).catch(err => {
    console.log(err);
})



/* middleware works
app.use((req, res, next) => {
    // console.log(Date.now());
    req.name = 'Shahzaib'
    next();
})*/

// Handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// method-override Middleware
app.use(methodOverride('_method'));

// express session for authentication middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// passport middleware (Must put after express session)
app.use(passport.initialize());
app.use(passport.session());

// flash middleware
app.use(flash())

// Globar var
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// Index Route
app.get('/', (req, res) => {
    //console.log(req.name);
    const title = 'Title'
    res.render('Index', {
        title: title
    });
});

// Dashboard Route
app.get('/dashboard', (req, res) => {
//    res.send('About')
    res.render('Dashboard')
})

// Search Route
app.get('/search', (req, res) => {
    console.log(req.body);
    // res.render('Dashboard')
})


// Load Idea Model
require('./models/Idea');
const Adds = mongoose.model('ideas')

// Catogries Route
app.get('/catagories/:category', (req, res) => {

  Adds.find({
    Category: req.params.category
  }).then(adds=>{   

    res.render('categories', {
      adds:adds
    });
  


  })
  
});


// use routes
app.use('/ideas', ideas)
app.use('/users', users)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Connected on port ' + port);
});