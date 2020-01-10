const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const database = require('../config/database')

//User Model import
const User = require('../models/User')
const { forwardAuthenticated } = require('../config/auth');



//Get Users list
router.get('/login', forwardAuthenticated, (req, res) => 
    res.render('login'))

router.get('/register', forwardAuthenticated, (req, res) => 
res.render('register'))

//Add a User
router.post('/register', (req, res) => {
    const { name, password, email, fave_game } = req.body
    let errors = []
    
    //error check required fields
    if(!name || !password || !email || !fave_game ) {
        errors.push({ msg: "Please fill in all fields"})
    }

    //Check password length
    if(password.length < 6) {
        errors.push({msg: "Password should be at least 6 characters"})
    }
    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            password,
            email,
            fave_game
        })
    }   else {
        //Validation Success
        User.findOne({
        where: { email: email}
        })
        .then(user => {
            if(user) {
                //User exist
                errors.push({ msg: 'Email exists!'})
                res.render('register', {
                errors,
                name,
                password,
                email,
                fave_game
            })
         }   else {
                const newUser = new User({
                    name,
                    password,
                    email,
                    fave_game
                })
                //Hash PW with bycrypt, generating salt for hash
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        // Set Password to hash for encryption
                        newUser.password = hash
                        //Save user
                        newUser.save()
                        .then(user =>{
                            req.flash('success_msg', 'You are now registered, login available')
                            res.redirect('./login')
                        })
                        .catch(err => console.log(err))

                }))
            }
        })
    }
})

//Login Handler
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });
  
  // Logout
  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
  
  module.exports = router;