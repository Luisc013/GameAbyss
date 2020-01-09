//load in environment variables
if(process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}

//dependency requirements
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const passport = require('passport')
const flash = require('express-flash')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const methodOverride = require('method-override')
const path = require('path')
const initializePassport = require('./passport-config')
const engine = require('ejs-locals')


// route connections
const indexRouter = require('./routes/index')
app.use('/', indexRouter)
const userRouter = require('./routes/users')
app.use('/users', userRouter)

//Mongoose Connection strings
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected to Mongoose"))


// set the view engine to ejs
app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set("layout", 'layouts/layout')
app .use(expressLayouts)


// Body parser middleware
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))
app.use(express.urlencoded({ extended: false }))


// set public folder
app.use(express.static(path.join(__dirname, 'public')))


//   initializePassport(
  module.exports = app
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, console.log(`Server started on port ${PORT}`));



//   passport,
//   email => users.find(user => user.email === email),
//   id => users.find(user => user.id === id)
//   )

//   // name of secret key in dotenv file, random string of number for security
//   // app.use(flash())
//   // app.use(session({
//   //   secret: process.env.SESSION_SECRET,
//   //   resave: false,
//   //   saveUninitialized: false
//   // }))
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(methodOverride('_method'))


// //middle thatll text req,res and the next variable when we done with authentication
// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//       return next()
//   }
//   res.redirect('/login')
// }

// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//       return res.redirect('/profile')
//   }
//   next()
// }
