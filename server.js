//load in environment variables
if(process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}

//dependency requirements
const express = require('express')
const app = express()
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const path = require('path')
const pg = require('pg')
const engine = require('ejs-locals')
const bodyParser = require('body-parser');

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

//Database
const database = require('./config/database.js')

//Passport Config
require('./config/passport')(passport);

//Test database
  database.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
  //Express session middleware
  app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }))

//Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());

  //Express flash middleware
  app.use(flash())

  //Global variables for middleware
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  }) ;
  
  
  // body parser middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  
  // serve static files 
  app.use(express.static(path.join(__dirname, 'public')))
  
  // set the view engine to ejs
  app.use(expressLayouts)
  app.set('view engine', 'ejs')

  //User routes
  app.use('/', require('./routes/index.js'));
  app.use('/users', require('./routes/users.js'));
  
  module.exports = app
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, console.log(`Server started on port ${PORT}`));
